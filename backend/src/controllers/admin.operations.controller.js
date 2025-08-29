// src/controllers/car.controller.js
import Car from '../models/car.model.js';
import Blog from '../models/blog.model.js';
import { Op } from 'sequelize';
import cloudinary from '../lib/cloudinary.js';

const uploadImagesToCloudinary = async (base64Images) => {
  if (!base64Images || base64Images.length === 0) {
    return [];
  }

  const uploadPromises = base64Images.map((base64Image) => {
    return cloudinary.uploader.upload(base64Image, {
      folder: 'car-dealership',
    });
  });

  try {
    const results = await Promise.all(uploadPromises);
    return results.map((result) => ({
      url: result.secure_url,
      public_id: result.public_id,
    }));
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload images to Cloudinary.');
  }
};

// Helper function to extract public_id from Cloudinary URL
const extractPublicIdFromUrl = (url) => {
  try {
    if (typeof url !== 'string') return null;

    // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{public_id}.{format}
    const matches = url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
    if (matches && matches[1]) {
      return matches[1]; // Return the public_id part
    }
    return null;
  } catch (error) {
    console.error('Error extracting public_id from URL:', error);
    return null;
  }
};

export const addCar = async (req, res) => {
  try {
    const {
      make,
      model,
      price, // Added price
      condition, // Added condition
      msrp,
      mileage,
      fuelType,
      transmission,
      year,
      bodyType,
      engineSize,
      horsepower,
      torque,
      drivetrain,
      description,
      images,
      sold,
      interior,
      exterior,
      comfort,
      safety,
      door,
      color,
      cylinder,
      length,
      width,
      trunkCapacity,
      tireSize,
      zeroToHundred,
    } = req.body;

    console.log('Received car data:', req.body);

    // Basic validation for required fields
    const requiredFields = {
      make,
      model,
      price,
      condition,
      mileage,
      fuelType,
      transmission,
      year,
      bodyType,
      engineSize,
      horsepower,
      torque,
      drivetrain,
      description,
      images,
      interior,
      exterior,
      comfort,
      safety,
      door,
      color,
      cylinder,
      length,
      width,
      trunkCapacity,
      tireSize,
      zeroToHundred,
    };

    // Loop through required fields
    for (const [field, value] of Object.entries(requiredFields)) {
      if (
        value === undefined ||
        value === null ||
        (Array.isArray(value) && value.length === 0) ||
        (field === 'zeroToHundred' && value <= 0)
      ) {
        return res
          .status(400)
          .json({ message: `Missing or invalid field: ${field}` });
      }
    }

    // Upload images to Cloudinary and get the URLs
    let imageUrls = [];
    if (images && Array.isArray(images) && images.length > 0) {
      imageUrls = await uploadImagesToCloudinary(images);
    }

    imageUrls = imageUrls.map((img) => img.url); // Store only URLs in the database

    // Use Sequelize's create method to add a new car.
    const newCar = await Car.create({
      make,
      model,
      price,
      condition,
      msrp,
      mileage,
      fuelType,
      transmission,
      year,
      bodyType,
      engineSize,
      horsepower,
      torque,
      drivetrain,
      description,
      imageUrls,
      sold,
      interior,
      exterior,
      comfort,
      safety,
      door,
      color,
      cylinder,
      length,
      width,
      trunkCapacity,
      tireSize,
      zeroToHundred,
    });

    // Respond with the newly created car object
    res.status(201).json(newCar);
  } catch (error) {
    console.error('Error in addCar controller:', error);
    const errorMessage =
      error.name === 'SequelizeValidationError'
        ? error.errors[0].message
        : error.message;

    res.status(500).json({ message: errorMessage });
  }
};

export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { images, ...carData } = req.body;
    console.log('Update car data received:', req.body);

    // Find the car by its primary key
    const car = await Car.findByPk(id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found.' });
    }

    // Separate new images (base64 strings) from existing images (objects with url/public_id)
    const existingImages = [];
    const newImageBase64s = [];

    if (images && Array.isArray(images)) {
      for (const imageData of images) {
        if (typeof imageData === 'object') {
          if (imageData.url && imageData.public_id && !imageData.isNew) {
            existingImages.push(imageData);
          } else if (
            imageData.url &&
            imageData.isNew &&
            imageData.url.startsWith('data:image')
          ) {
            newImageBase64s.push(imageData.url);
          }
        } else if (
          typeof imageData === 'string' &&
          imageData.startsWith('data:image')
        ) {
          // Allow raw base64 strings too
          newImageBase64s.push(imageData);
        }
      }
    }

    // Upload all new images in parallel
    const newImageUploads = await uploadImagesToCloudinary(newImageBase64s);

    // Combine kept and newly uploaded images
    const finalImages = [...existingImages, ...newImageUploads];

    // Determine which images to delete from Cloudinary
    const publicIdsToDelete = car.imageUrls
      ? car.imageUrls
          .filter((oldImg) => {
            const oldPublicId =
              typeof oldImg === 'object' && oldImg.public_id
                ? oldImg.public_id
                : extractPublicIdFromUrl(oldImg); // Handle old string-only URLs

            return (
              oldPublicId &&
              !finalImages.some((newImg) => newImg.public_id === oldPublicId)
            );
          })
          .map((oldImg) =>
            typeof oldImg === 'object'
              ? oldImg.public_id
              : extractPublicIdFromUrl(oldImg)
          )
      : [];

    // Delete unused images from Cloudinary in parallel
    if (publicIdsToDelete.length > 0) {
      await cloudinary.api.delete_resources(publicIdsToDelete, {
        type: 'upload',
        resource_type: 'image',
      });
      console.log(
        `Deleted images from Cloudinary: ${publicIdsToDelete.join(', ')}`
      );
    }

    // Update the car's data in the database
    const imageUrls = finalImages.map((img) => img.url);

    console.log('Extracted URLs:', imageUrls); // Debug log

    // Save only urls to carData
    carData.imageUrls = imageUrls;

    // Respond with the updated car object
    await car.update(carData);
    res.status(200).json(car);
  } catch (error) {
    console.error('Error in updateCar controller:', error);
    const errorMessage =
      error.name === 'SequelizeValidationError'
        ? error.errors.map((e) => e.message).join(', ')
        : error.message;
    res.status(500).json({ message: errorMessage });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRowCount = await Car.destroy({
      where: { id },
    });

    if (deletedRowCount === 0) {
      return res
        .status(404)
        .json({ message: 'Car not found or already deleted.' });
    }

    res.status(200).json({ message: 'Car deleted successfully.' });
  } catch (error) {
    console.error('Error in deleteCar controller:', error);
    res
      .status(500)
      .json({ message: 'Internal Server Error while deleting the car.' });
  }
};

export const addBlog = async (req, res) => {
  try {
    // Extract the blog data from the request body
    const {
      title,
      tagline,
      imageUrl,
      featuredImage,
      authorId,
      category,
      status,
      content,
      carIds,
      tags,
      publishedAt,
      seoTitle,
      seoDescription,
    } = req.body;

    // Prepare Base64 images for upload
    const base64Images = [];
    if (imageUrl) base64Images.push(imageUrl);
    if (featuredImage) base64Images.push(featuredImage);

    // Upload images to Cloudinary
    let uploadedImages = [];
    if (base64Images.length > 0) {
      uploadedImages = await uploadImagesToCloudinary(base64Images);
    }

    // Map uploaded URLs back to the fields
    const savedImageUrl = uploadedImages[0]?.url || null;
    const savedFeaturedImage = uploadedImages[1]?.url || null;

    // Create the blog entry in DB
    const newBlog = await Blog.create({
      title,
      tagline,
      imageUrl: savedImageUrl,
      featuredImage: savedFeaturedImage,
      authorId,
      category,
      status,
      content,
      carIds,
      tags,
      publishedAt,
      seoTitle,
      seoDescription,
    });

    res.status(201).json({
      message: 'Blog post created successfully!',
      data: newBlog,
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({
      message: 'An error occurred while creating the blog post.',
      error: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      tagline,
      imageUrl,
      featuredImage,
      authorId,
      category,
      status,
      content,
      carIds,
      tags,
      publishedAt,
      seoTitle,
      seoDescription,
    } = req.body;

    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found.' });

    // --- Handle imageUrl ---
    let savedImageUrl = blog.imageUrl;
    if (imageUrl?.startsWith('data:image')) {
      const uploaded = await uploadImagesToCloudinary([imageUrl]);
      savedImageUrl = uploaded[0].url;

      // Delete old image from Cloudinary if exists
      if (blog.imageUrl) {
        const publicId = extractPublicIdFromUrl(blog.imageUrl);
        await cloudinary.api.delete_resources([publicId]);
      }
    } else if (imageUrl) {
      savedImageUrl = imageUrl; // user passed a new URL
    }

    // --- Handle featuredImage ---
    let savedFeaturedImage = blog.featuredImage;
    if (featuredImage?.startsWith('data:image')) {
      const uploaded = await uploadImagesToCloudinary([featuredImage]);
      savedFeaturedImage = uploaded[0].url;

      // Delete old image
      if (blog.featuredImage) {
        const publicId = extractPublicIdFromUrl(blog.featuredImage);
        await cloudinary.api.delete_resources([publicId]);
      }
    } else if (featuredImage) {
      savedFeaturedImage = featuredImage;
    }

    // --- Update blog ---
    await blog.update({
      title,
      tagline,
      imageUrl: savedImageUrl,
      featuredImage: savedFeaturedImage,
      authorId,
      category,
      status,
      content,
      carIds,
      tags,
      publishedAt,
      seoTitle,
      seoDescription,
    });

    res.status(200).json({
      message: 'Blog post updated successfully!',
      data: blog,
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({
      message: 'An error occurred while updating the blog post.',
      error: error.message,
    });
  }
};

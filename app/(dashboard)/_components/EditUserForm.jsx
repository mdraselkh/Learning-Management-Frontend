"use client";
import { loadUser, setUser, updateUser } from "@/app/store/authSlice";
import axiosInstance from "@/app/utils/axiosInstance";
import { showErrorToast, showSuccessToast } from "@/app/utils/sweetAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const EditUserForm = ({ user }) => {
  console.log(user);
  const [formData, setFormData] = useState({
    name: user.name || "",
    // password: user.password || "",
    phone: user.phone || "",
    email: user.email || "",
    city: user.city || "",
    address: user.address || "",
    description: user.description || "",
    image: null,
    imagePreview: user.image_url || null,
  });
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  useEffect(() => {
  setFormData({
    name: user.name || "",
    phone: user.phone || "",
    email: user.email || "",
    city: user.city || "",
    address: user.address || "",
    description: user.description || "",
    image: null,
    imagePreview: user.image_url || null,
  });
}, [user]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        setFormData({
          ...formData,
          image: file,
          imagePreview: URL.createObjectURL(file),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageRemove = () => {
    setFormData({ ...formData, image: null, imagePreview: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("phone", formData.phone);
    // form.append("password", formData.password);
    form.append("email", formData.email);
    form.append("city", formData.city);
    form.append("address", formData.address);
    form.append("role", user.role);
    form.append("description", formData.description);
    if (formData.image) {
      form.append("image_url", formData.image);
    }

    try {
      const res = await axiosInstance.patch(
        `/api/users/updateUser/${user.id || user.userId}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        showSuccessToast(`${user.role} updated successfully!`);
        console.log(res.data.safeUser);

        dispatch(setUser(res.data.safeUser));

        // setFormData({
        //   name: "",
        //   // password: "",
        //   phone: "",
        //   email: "",
        //   city: "",
        //   address: "",
        //   description: "",
        //   image: null,
        // });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        showErrorToast("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      showErrorToast(err.response.data.message || "Failed to update user.");
    }
  };

  return (
    <div className=" mx-auto p-10 bg-white shadow-lg rounded">
      <h1 className="text-xl font-semibold">
        Update <span>{user.role.toLocaleUpperCase()}</span>
      </h1>
      <span className="text-sm mt-3">
        Please fill out all the details to update {user.role}
      </span>
      <form onSubmit={handleSubmit} className="space-y-8 mt-10">
        <div>
          <Input
            className="h-12 !py-3"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input
            className="h-12 !py-3"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <Input
            className="h-12 !py-3"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input
            className="h-12 !py-3"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <Input
            className="h-12 !py-3"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        {/* <Input
          className="h-12 !py-3"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        /> */}

        <Textarea
          name="description"
          placeholder="Tell us about yourself..."
          value={formData.description}
          onChange={handleChange}
          className="min-h-[100px]"
        />

        <div className="flex flex-col space-y-2">
          <label htmlFor="image" className="font-medium text-sm">
            Upload Image
          </label>
          <Input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            ref={fileInputRef}
            className="cursor-pointer h-14 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700"
          />
        </div>
        {formData.imagePreview && (
          <div className="relative w-40 h-40 mt-2">
            <img
              src={formData.imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded border"
            />
            <button
              type="button"
              onClick={handleImageRemove}
              className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 shadow-md"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <Button
          type="submit"
          className="mt-5 bg-yellow-500 hover:bg-yellow-300 text-black"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditUserForm;

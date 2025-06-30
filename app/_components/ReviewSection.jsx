"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../utils/sweetAlert";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "../utils/axiosInstance";
import Loading from "../loading";

const ReviewSection = ({ courseId }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: "",
    comment: "",
  });

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/review/getReviewByCourse/${courseId}`
      );
      console.log(response);
      setReviews(response.data.data);
    } catch (error) {
      console.log("Error during fetching all reviews", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(reviews);

  useEffect(() => {
    fetchReviews();
  }, [courseId]);


  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) return;

    setIsLoading(true);

    const payload = {
      rating: newReview.rating,
      comment: newReview.comment,
    };

    try {
      if (isEditing && editingReviewId) {
        // 🔄 Update Review
        const res = await axiosInstance.patch(
          `/api/review/updateReview/${editingReviewId}`,
          payload
        );
        if (res.data.success) {
          showSuccessToast("Review updated successfully!");
        }
      } else {
        // ➕ Add New Review
        const reviewPayload = {
          ...payload,
          userId: user.userId,
          courseId,
        };

        const res = await axiosInstance.post(
          "/api/review/addreview",
          reviewPayload
        );
        if (res.data.success) {
          showSuccessToast("Review submitted successfully!");
        }
      }

      setNewReview({ rating: "", comment: "" });
      setIsEditing(false);
      setEditingReviewId(null);
      fetchReviews();
    } catch (err) {
      console.error(err);
      showErrorToast("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="mt-8 bg-white p-5 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Course Reviews</h2>

      {/* Show Existing Reviews */}
      <div className="space-y-4 mb-6">
        {reviews.map((review, i) => (
          <div key={i} className="bg-gray-50 p-4  shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10">
                  <Image
                    src={review.image_url || "/images/people.png"}
                    alt="profileImg"
                    width={100}
                    height={100}
                    className="w-full h-full rounded-full  bg-gray-400 object-cover"
                  />
                </div>
                <span className="font-medium">{review.name}</span>
              </div>
              <span className="text-yellow-500">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </span>
            </div>
            <div className="flex gap-2 mt-2">
              <p className="text-sm  text-gray-700">{review.comment}</p>
              {review?.id === user?.userId && (
                <button
                  className="text-sm text-teal-800 underline"
                  onClick={() => {
                    setIsEditing(true);
                    setEditingReviewId(review.review_id);
                    setNewReview({
                      rating: review.rating,
                      comment: review.comment,
                    });
                  }}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add New Review */}
      <div className="bg-gray-50 p-6 rounded-xl shadow border">
        <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Rating
            </label>
            <select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({
                  ...newReview,
                  rating: parseInt(e.target.value),
                })
              }
              className="w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Select rating</option>
              <option value={5}>★★★★★ - Excellent</option>
              <option value={4}>★★★★☆ - Good</option>
              <option value={3}>★★★☆☆ - Average</option>
              <option value={2}>★★☆☆☆ - Poor</option>
              <option value={1}>★☆☆☆☆ - Terrible</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Review
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              className="w-full border border-gray-300 rounded p-2 mb-5"
              rows={4}
              placeholder="Write your thoughts..."
              required
            />
          </div>

          {isAuthenticated ? (
            <div className="flex gap-2 ">
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingReviewId(null);
                    setNewReview({ rating: "", comment: "" });
                  }}
                  className="px-2 py-1 md:px-4 md:py-3 bg-white border-teal-800 border hover:bg-teal-600 hover:text-white rounded text-xs md:text-base"
                >
                  Cancel Edit
                </button>
              )}

              <button
                type="submit"
                className="text-xs md:text-base relative flex items-center justify-center bg-teal-950 text-white rounded px-2 py-1 md:px-4 md:py-3 hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : isEditing ? (
                  "Update Review"
                ) : (
                  "Submit Review"
                )}
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-teal-950  text-white rounded px-4 py-3  hover:bg-teal-700 transition"
            >
              Submit Review
            </Link>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReviewSection;

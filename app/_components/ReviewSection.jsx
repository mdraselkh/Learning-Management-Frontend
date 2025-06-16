"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../utils/sweetAlert";
import Image from "next/image";
import Link from "next/link";

const ReviewSection = ({ courseId }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: "",
    comment: "",
  });

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/review/getReviewByCourse/${courseId}`
      );
      console.log(response);
      setReviews(response.data.data);
    } catch (error) {
      console.log("Error during fetching all reviews", error);
    }
  };

  console.log(reviews);

  useEffect(() => {
    fetchReviews();
  }, [courseId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) return;

    const reviewPayload = {
      userId: user.userId,
      courseId: courseId,
      rating: newReview.rating,
      comment: newReview.comment,
    };

    console.log(reviewPayload);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/review/addreview",
        reviewPayload
      );
      console.log(res);
      if ((res.data.success = true)) {
        showSuccessToast("Review submitted succesfully!");
        setNewReview({ rating: "", comment: "" });
        fetchReviews();
      }
    } catch (err) {
      console.error(err);
      showErrorToast("Something went wrong!");
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
                    src={review.image_url}
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
            <p className="text-sm mt-2 text-gray-700">{review.comment}</p>
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
            <button
              type="submit"
              className="bg-teal-950  text-white rounded px-4 py-3  hover:bg-teal-700 transition"
            >
              Submit Review
            </button>
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

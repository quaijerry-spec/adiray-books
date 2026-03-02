// src/pages/Account.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDropzone } from "react-dropzone";

export default function Account() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [uploading, setUploading] = useState(false);

  // Fetch user profile
  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    };
    fetchProfile();
  }, [user]);

  // Fetch user orders
  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      const ordersRef = collection(db, "orders");
      const q = query(
        ordersRef,
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(list);
    };
    fetchOrders();
  }, [user]);

  // Drag & drop upload
  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!acceptedFiles[0]) return;
      setUploading(true);
      try {
        const file = acceptedFiles[0];
        const storageRef = ref(storage, `profile/${user.uid}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        await updateDoc(doc(db, "users", user.uid), { photoURL: url });
        setProfile((prev) => ({ ...prev, photoURL: url }));
        setMessage("✅ Profile photo updated!");
        setTimeout(() => setMessage(""), 3000);
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to upload photo");
      }
      setUploading(false);
    },
    [user]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // Change password
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      setMessage("❌ Fill both current and new password");
      return;
    }
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      setMessage("✅ Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      if (err.code === "auth/wrong-password") setMessage("❌ Current password is incorrect");
      else if (err.code === "auth/weak-password") setMessage("❌ Password must be at least 6 characters");
      else setMessage("❌ Failed to change password");
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    const password = prompt("Enter your password to confirm account deletion:");
    if (!password) return;
    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(auth.currentUser);
      alert("Your account has been deleted.");
      navigate("/");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/wrong-password") alert("Incorrect password. Account not deleted.");
      else alert("Failed to delete account. Please try again.");
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-6">Your Profile</h1>

        {message && (
          <div
            className={`mb-4 px-4 py-2 rounded ${
              message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <div {...getRootProps()} className="relative">
            <input {...getInputProps()} />
            <img
              src={profile.photoURL || "/default-user.png"}
              alt={user.displayName || "User"}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md cursor-pointer"
            />
            {isDragActive && (
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center text-white font-semibold">
                Drop image here
              </div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <p><strong>Name:</strong> {user.displayName || "N/A"}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {profile.role || "user"}</p>
          </div>
        </div>

        {/* Change Password */}
        <div className="mb-8 p-6 bg-gray-50 rounded-xl shadow-inner space-y-4">
          <h2 className="text-2xl font-semibold">Change Password</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="p-2 border rounded flex-1"
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="p-2 border rounded flex-1"
            />
            <button
              onClick={handleChangePassword}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Update
            </button>
          </div>
        </div>

        {/* Delete Account */}
        <div className="mb-8 p-6 bg-red-50 rounded-xl shadow-inner">
          <h2 className="text-2xl font-semibold mb-2 text-red-700">Danger Zone</h2>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Delete Account
          </button>
        </div>

        {/* Orders List */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders yet.</p>
          ) : (
            <ul className="space-y-3">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="p-4 bg-gray-50 rounded-xl shadow flex justify-between items-center"
                >
                  <div>
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Status:</strong> {order.approvalStatus}</p>
                    <p><strong>Total:</strong> ${Number(order.totalAmount).toFixed(2)}</p>
                  </div>
                  <Link
                    to={`/orders/${order.id}`}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    View
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

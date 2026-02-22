import React, { useEffect, useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const functions = getFunctions();

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      setUsers(snapshot.docs.map(doc => doc.data()));
    };

    fetchUsers();
  }, []);

  const promoteToAdmin = async (email) => {
    const makeAdmin = httpsCallable(functions, "makeAdmin");
    await makeAdmin({ email });
    alert("User promoted to admin. Ask them to re-login.");
  };

  return (
    <div className="p-8">
      <h2 className="text-xl mb-4">User Management</h2>
      {users.map((user, i) => (
        <div key={i} className="mb-2">
          {user.email}
          <button
            onClick={() => promoteToAdmin(user.email)}
            className="ml-4 px-3 py-1 bg-orange-500 text-white rounded"
          >
            Make Admin
          </button>
        </div>
      ))}
    </div>
  );
}

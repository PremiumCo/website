"use client"

import React, { useEffect, useState } from 'react';

const StaffPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const guildId = "841760990637850675"; // Your guild ID
  const roleId = "841785398997155900"; // Replace with your desired role ID

  const apiUrl = `http://localhost:5000/api/guilds/${guildId}/members/${roleId}`;

  const getGuildMembersByRole = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const members = await response.json();
      setMembers(members);
    } catch (error) {
      console.error("Failed to fetch guild members:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGuildMembersByRole();
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Staff Members with Role</h1>
      </header>
      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : (
        <ul style={styles.memberList}>
          {members.map(member => (
            <li key={member.user.id} style={styles.memberItem}>
              {member.user.username}#{member.user.discriminator} - Roles: {member.roles.join(', ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    minHeight: '100vh',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '2rem',
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5rem',
  },
  memberList: {
    listStyleType: 'none',
    padding: 0,
  },
  memberItem: {
    padding: '10px',
    border: '1px solid #444',
    borderRadius: '5px',
    marginBottom: '10px',
    backgroundColor: '#2a2a2a',
  },
};

export default StaffPage;

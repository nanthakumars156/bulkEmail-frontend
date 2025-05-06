
import { API } from './globalData';
import React, { useEffect, useState } from 'react';

function SentEmailsTable() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    // Example: Fetch from backend
    fetch(`${API}/mailForm`,{
        method : "GET",
        headers :{
            "x-auth-token": sessionStorage.getItem("token")
        }

        }) // Replace with your API
      .then(res => res.json())
      .then(data => setEmails(data))
      .catch(err => console.error('Failed to fetch emails', err));
  }, []);

  return (
    <div>
      <h2>Sent Emails</h2>
     
    <div style={{ overflowX: 'auto' }}>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Sender</th>
            <th>To</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Mail Sent At</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email, index) => (
            <tr key={email._id}>
              <td>{index + 1}</td>
              <td>{email.name}</td>
              <td>{email.to}</td>
              <td>{email.subject}</td>
              <td dangerouslySetInnerHTML={{ __html: email.message }} />
              <td>{email.mailSendAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default SentEmailsTable;


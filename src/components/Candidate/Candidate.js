import React from "react";
import "./Candidate.css";

function Candidate({ candidate, handleDeleteVote }) {
  return (
    <div className="candidate">
      <h2>{candidate.name}</h2>
      <p>Total: {candidate.votes}</p>
      {candidate.voters.length > 0 && (
        <div>
          <ul>
            {candidate.voters.map((voter, index) => (
              <li key={index}>
                {voter}
                <button onClick={() => handleDeleteVote(candidate.id, voter)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Candidate;

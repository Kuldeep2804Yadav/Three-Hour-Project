import React, { useState } from "react";
import Candidate from "./components/Candidate/Candidate";
import Modal from "./components/FormModal/Modal";
import "./App.css";

const candidatesData = [
  { id: 1, name: "Kuldeep", votes: 0, voters: [] },
  { id: 2, name: "Sandeep", votes: 0, voters: [] },
  { id: 3, name: "Jiya", votes: 0, voters: [] },
];

function App() {
  const [candidates, setCandidates] = useState(candidatesData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [voterName, setVoterName] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");

  const handleVote = (voteInfo) => {
    const updatedCandidates = candidates.map((candidate) => {
      if (candidate.id === parseInt(voteInfo.monitor)) {
        return {
          ...candidate,
          votes: candidate.votes + 1,
          voters: [...candidate.voters, voteInfo.name],
        };
      }
      return candidate;
    });
    setCandidates(updatedCandidates);
    setModalIsOpen(false);
    setVoterName("");
    setSelectedCandidate("");
  };

  const handleDeleteVote = (candidateId, voterNameToDelete) => {
    const updatedCandidates = candidates.map((candidate) => {
      if (candidate.id === candidateId) {
        const newVotes = candidate.votes - 1;
        const newVoters = candidate.voters.filter((voter) => voter !== voterNameToDelete);
        return {
          ...candidate,
          votes: newVotes >= 0 ? newVotes : 0,
          voters: newVoters,
        };
      }
      return candidate;
    });

    setCandidates(updatedCandidates);
  };

  // Calculate total votes across all candidates
  const totalVotes = candidates.reduce((acc, candidate) => acc + candidate.votes, 0);

  return (
    <div className="App">
      <div className="Main">
        <h1>Class Monitor Vote</h1>
        <p>Total Vote <span>{totalVotes}</span></p>
        <button onClick={() => setModalIsOpen(true)}>Add new Vote</button>
      </div>
      {modalIsOpen && (
        <Modal
          onVoterName={voterName}
          onSetModalIsOpen={setModalIsOpen}
          candidates={candidates}
          onsetVoterName={setVoterName}
          selectedCandidate={selectedCandidate}
          setSelectedCandidate={setSelectedCandidate}
          handleVote={handleVote}
        />
      )}
      <div className="candidates">
        {candidates.map((candidate) => (
          <Candidate
            key={candidate.id}
            candidate={candidate}
            handleDeleteVote={handleDeleteVote}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

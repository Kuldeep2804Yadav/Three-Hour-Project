import React from "react";
import "./Modal.css";

function Modal(props) {
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const voteInfo = {
      name: props.onVoterName,
      monitor: props.selectedCandidate,
    };

    props.handleVote(voteInfo);
  };

  return (
    <React.Fragment>
      <div
        className="modal-overlay"
        onClick={() => props.onSetModalIsOpen(false)}
      ></div>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={formSubmitHandler}>
          <label>
            Student Name:
            <input
              type="text"
              value={props.onVoterName}
              onChange={(e) => props.onsetVoterName(e.target.value)}
              required
            />
          </label>
          <label>
            Select Monitor:
            <select
              value={props.selectedCandidate}
              onChange={(e) => props.setSelectedCandidate(e.target.value)}
              required
            >
              <option value="">--Select--</option>
              {props.candidates.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Vote</button>
          <button type="button" onClick={() => props.onSetModalIsOpen(false)}>
            X
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Modal;

import { useState, useRef } from "react";

function CreateArea(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const contentRef = useRef(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    if (note.title.trim() !== "" || note.content.trim() !== "") {
      props.onAdd(note);
      setNote({
        title: "",
        content: "",
      });
    }
    event.preventDefault();
  }

  function expand() {
    setIsExpanded(true);
  }

  // Handle key press for form submission
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      // In title field: move to content field
      if (event.target.name === "title") {
        event.preventDefault();
        contentRef.current.focus();
      }
      // In content field: submit when Enter is pressed (not shift+enter for newlines)
      else if (event.target.name === "content") {
        if (!event.shiftKey) {
          event.preventDefault();
          submitNote(event);
        }
      }
    }
  }

  return (
    <div className="create-note-container">
      <form className={isExpanded ? "expanded" : ""} onSubmit={submitNote}>
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            autoFocus
            onKeyDown={handleKeyDown}
          />
        )}
        <textarea
          ref={contentRef}
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
          onKeyDown={handleKeyDown}
        />
        {isExpanded && (
          <button type="submit">
            <span className="material-icons">add</span>
          </button>
        )}
      </form>
    </div>
  );
}

export default CreateArea;

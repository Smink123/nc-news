import CloseIcon from "@mui/icons-material/Close";


export default function NonExistent() {
  return (
    <>
      <section id="non-existent-container">
        <p id="does-not-exist-message" className="error">
          Uh oh...seems like this page does not exist! <CloseIcon/>
        </p>
      </section>
    </>
  );
}

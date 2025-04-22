import PropTypes from "prop-types";

const Modal = ({ isOpen, children }) => {
  return (
    isOpen && (
      <div className="z-50 w-full h-screen bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center p-4">
        {children}
      </div>
    )
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default Modal;

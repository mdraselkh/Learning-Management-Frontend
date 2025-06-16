import Swal from "sweetalert2";


const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

// Function to show success toast
const showSuccessToast = (title) => {
  Toast.fire({
    icon: "success",
    title: title,
  });
};

// Function to show error toast
const showErrorToast = (title) => {
  Toast.fire({
    icon: "error",
    title: title,
  });
};

// Function to show info toast
const showInfoToast = (title) => {
  Toast.fire({
    icon: "info",
    title: title,
  });
};

// Function to show warning toast
const showWarningToast = (title) => {
  Toast.fire({
    icon: "warning",
    title: title,
  });
};

// Function to show question toast
const showQuestionToast = (title) => {
  Toast.fire({
    icon: "question",
    title: title,
  });
};

export {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  showWarningToast,
  showQuestionToast,
};

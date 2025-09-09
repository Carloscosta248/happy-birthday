// Cấu hình links - Thay đổi các URL này thành links thực của bạn
const socialLinks = {
  discord: "https://discord.gg/yJ6KeWUcQe", // Thay bằng link Discord của bạn
  instagram: "https://www.instagram.com/thanhdo113003/", // Thay bằng username Instagram
  youtube:
    "https://www.youtube.com/@thanhdoanh3003https://www.youtube.com/@thanhdoanh3003", // Thay bằng channel YouTube
};

// Loading Screen Animation với hiệu ứng viết tay
window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loading-screen");

  // Tạo hiệu ứng âm thanh viết tay mô phỏng
  simulateWritingSounds();

  // Ẩn loading screen sau 7.3 giây (để đủ thời gian cho animation welcome + signature)
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 7300);
});

// Mô phỏng âm thanh viết tay bằng Web Audio API
function simulateWritingSounds() {
  if (!window.AudioContext && !window.webkitAudioContext) return;

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Tạo âm thanh scratch nhẹ khi viết
  function createWritingSound(frequency = 800, duration = 100) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = "sawtooth";

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.01
    );
    gainNode.gain.linearRampToValueAtTime(
      0,
      audioContext.currentTime + duration / 1000
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  }

  // Phát âm thanh theo thời gian viết từng chữ cái
  const writingTimings = [
    { time: 800, freq: 850 }, // T
    { time: 1400, freq: 780 }, // h
    { time: 1900, freq: 820 }, // a
    { time: 2600, freq: 800 }, // n
    { time: 3000, freq: 790 }, // h
    { time: 3500, freq: 830 }, // D
    { time: 4100, freq: 810 }, // o
    { time: 4600, freq: 760 }, // flourish
    { time: 5200, freq: 740 }, // underline
  ];

  writingTimings.forEach((timing) => {
    setTimeout(() => {
      createWritingSound(timing.freq, 150);
    }, timing.time);
  });
}

// Mở link social media
function openLink(platform) {
  const url = socialLinks[platform];
  if (url) {
    // Thêm hiệu ứng click
    event.target.closest(".social-btn").style.transform = "scale(0.95)";

    setTimeout(() => {
      window.open(url, "_blank");
      event.target.closest(".social-btn").style.transform = "";
    }, 150);
  }
}

// Modal Functions
function toggleModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal.classList.contains("active")) {
    closeModal(modalId);
  } else {
    openModal(modalId);
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("active");
  modal.style.display = "flex";

  // Thêm animation cho modal content
  const modalContent = modal.querySelector(".modal-content");
  modalContent.style.animation = "modalSlideUp 0.3s ease-out";

  // Khóa scroll của body
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  const modalContent = modal.querySelector(".modal-content");

  // Animation slide down
  modalContent.style.animation = "modalSlideDown 0.3s ease-in";

  setTimeout(() => {
    modal.classList.remove("active");
    modal.style.display = "none";
    document.body.style.overflow = "";
  }, 300);
}

// Thêm keyframe animation cho slide down
const style = document.createElement("style");
style.textContent = `
    @keyframes modalSlideDown {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
        }
    }
`;
document.head.appendChild(style);

// Đóng modal khi nhấn ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const activeModal = document.querySelector(".modal.active");
    if (activeModal) {
      const modalId = activeModal.id;
      closeModal(modalId);
    }
  }
});

// Thêm hiệu ứng ripple khi click button
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  ripple.classList.add("ripple");

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Thêm CSS cho ripple effect
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    .social-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: rippleAnimation 0.6s linear;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Thêm event listeners cho ripple effect
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".social-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", createRipple);
  });
});

// Parallax effect cho floating shapes
function updateParallax() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".shape");

  parallaxElements.forEach((element, index) => {
    const speed = (index + 1) * 0.1;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px) rotate(${
      scrolled * speed * 0.5
    }deg)`;
  });
}

// Throttle function để tối ưu performance
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Thêm parallax scroll event (throttled)
window.addEventListener("scroll", throttle(updateParallax, 16));

// Intersection Observer cho animations khi scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

// Quan sát các elements cần animate
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(".social-btn");
  animatedElements.forEach((el, index) => {
    el.style.animationDelay = `${4.5 + index * 0.1}s`;
    el.style.opacity = "0";
    el.style.animation = "slideUp 0.6s ease-out forwards";
    observer.observe(el);
  });
});

// Hiệu ứng typing cho subtitle
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Khởi tạo typing effect sau khi loading
setTimeout(() => {
  const subtitle = document.querySelector(".subtitle");
  if (subtitle) {
    const originalText = subtitle.textContent;
    typeWriter(subtitle, originalText, 80);
  }
}, 4500);

// Touch gestures cho mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener("touchstart", function (e) {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener("touchend", function (e) {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 100;
  const diff = touchStartY - touchEndY;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe up - có thể thêm animation đặc biệt
      document.querySelector(".floating-shapes").style.animationDuration = "4s";
    } else {
      // Swipe down - có thể thêm animation đặc biệt
      document.querySelector(".floating-shapes").style.animationDuration = "8s";
    }
  }
}

// Easter egg - Double click trên avatar để thay đổi gradient
let clickCount = 0;
document.querySelector(".avatar").addEventListener("click", function () {
  clickCount++;

  if (clickCount === 2) {
    const gradients = [
      "linear-gradient(135deg, #ff6b6b, #4ecdc4)",
      "linear-gradient(135deg, #a8edea, #fed6e3)",
      "linear-gradient(135deg, #ffecd2, #fcb69f)",
      "linear-gradient(135deg, #e3ffe7, #d9e7ff)",
      "linear-gradient(135deg, #ffd3a5, #fd9853)",
    ];

    const randomGradient =
      gradients[Math.floor(Math.random() * gradients.length)];
    this.style.background = randomGradient;

    // Reset click count
    setTimeout(() => {
      clickCount = 0;
    }, 500);
  }

  // Auto reset nếu không double click trong 500ms
  setTimeout(() => {
    if (clickCount === 1) {
      clickCount = 0;
    }
  }, 500);
});

// Preload fonts
document.addEventListener("DOMContentLoaded", function () {
  const fontPreload1 = document.createElement("link");
  fontPreload1.rel = "preload";
  fontPreload1.as = "font";
  fontPreload1.href =
    "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap";
  fontPreload1.crossOrigin = "anonymous";

  const fontPreload2 = document.createElement("link");
  fontPreload2.rel = "preload";
  fontPreload2.as = "font";
  fontPreload2.href =
    "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap";
  fontPreload2.crossOrigin = "anonymous";

  document.head.appendChild(fontPreload1);
  document.head.appendChild(fontPreload2);
});

// Copy function cho banking info
function copyText(text) {
  // Tạo element tạm thời để copy
  const tempInput = document.createElement("input");
  tempInput.style.position = "absolute";
  tempInput.style.left = "-9999px";
  tempInput.value = text;
  document.body.appendChild(tempInput);

  // Select và copy text
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // Cho mobile devices

  try {
    document.execCommand("copy");

    // Hiển thị thông báo đã copy
    showCopyNotification(text);
  } catch (err) {
    console.error("Không thể copy:", err);
    // Fallback cho trường hợp execCommand không hoạt động
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showCopyNotification(text);
        })
        .catch((err) => {
          console.error("Clipboard API failed:", err);
        });
    }
  }

  // Xóa element tạm thời
  document.body.removeChild(tempInput);
}

// Hiển thị thông báo đã copy
function showCopyNotification(text) {
  // Tạo notification element
  const notification = document.createElement("div");
  notification.className = "copy-notification";
  notification.innerHTML = `
    <div class="notification-content">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
      <span>Đã copy: ${text}</span>
    </div>
  `;

  // Thêm vào body
  document.body.appendChild(notification);

  // Animation hiển thị
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Xóa sau 3 giây
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Performance optimization
window.addEventListener("load", function () {
  // Lazy load non-critical animations
  setTimeout(() => {
    document.querySelectorAll(".shape").forEach((shape, index) => {
      shape.style.animationDelay = `${index * 0.5}s`;
    });
  }, 5000);
});

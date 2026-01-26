
document.addEventListener("DOMContentLoaded", () => {
    /* ===== JOIN FORM ===== */
    const joinRadios = document.querySelectorAll('input[name="join"]');
    const joinExtra = document.getElementById('join-extra');

    if (joinExtra && joinRadios.length) {
        joinExtra.style.display = 'none'; // mặc định ẩn

        joinRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                if (this.value === 'Có') {
                    joinExtra.style.display = 'block';
                } else {
                    joinExtra.style.display = 'none';

                    // reset các ô bên trong khi chọn "Không"
                    joinExtra.querySelectorAll('input, select').forEach(el => {
                        if (el.type === 'checkbox' || el.type === 'radio') {
                            el.checked = false;
                        } else {
                            el.value = '';
                        }
                    });
                }
            });
        });
    }
    /* ===== SLIDE ===== */
    const images = [
        "https://cdn.jsdelivr.net/gh/linh3t261026-sketch/mywedding-assets/images/TOM02937.webp",
        "https://cdn.jsdelivr.net/gh/linh3t261026-sketch/mywedding-assets/images/TOM02052.webp",
        "https://cdn.jsdelivr.net/gh/linh3t261026-sketch/mywedding-assets/images/TOM02494.webp",
        "https://cdn.jsdelivr.net/gh/linh3t261026-sketch/mywedding-assets/images/TOM02869.webp"
    ];

    let index = 0;
    const cover = document.querySelector(".classic-cover");
    if (cover) {
        cover.style.backgroundImage = `url(${images[0]})`;

        setInterval(() => {
            index = (index + 1) % images.length;
            cover.style.backgroundImage = `url(${images[index]})`;
        }, 4000);
    }
    /* ===== add data ===== */

    const loading = document.getElementById("loading-overlay");
    const form = document.getElementById("guestbook");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const fullname = this.fullname.value.trim();
            const phone = this.phone.value.trim();
            const joinChecked = this.querySelector('input[name="join"]:checked');
            const guestOfChecked = this.querySelectorAll('input[name="guestOf"]:checked');
            if (!fullname) {
                alert("Vui lòng nhập họ tên");
                return;
            }

            if (!phone) {
                alert("Vui lòng nhập số điện thoại");
                return;
            }

            if (!joinChecked) {
                alert("Vui lòng chọn bạn có tham gia hay không");
                return;
            }

            if (joinChecked.value === "Có" && guestOfChecked.length === 0) {
                alert("Vui lòng chọn bạn là khách mời của ai");
                return;
            }
            loading.style.display = "flex";
            document.body.style.overflow = "hidden";

            const formData = new FormData(this);
            const guestOf = [];
            this.querySelectorAll('input[name="guestOf"]:checked')
                .forEach(cb => guestOf.push(cb.value));
            formData.set("guestOf", guestOf.join(", "));

            fetch("https://script.google.com/macros/s/AKfycbwQNc18uc95u-QzgtmwER3UAFmAXzAHL_2RFkesjoLOrpGBrWdvW77IE3nlVDrM64F7Sg/exec", {
                method: "POST",
                body: formData,
                mode: "no-cors"
            })
                .then(res => res.text())
                .then(() => {
                    loading.style.display = "none";    // 🔥 TẮT LOADING
                    document.body.style.overflow = "";
                    alert("Cảm ơn bạn đã gửi những lời chúc tuyệt vời đến dâu rể 💖");
                    this.reset(); // 🔥 RESET FORM SAU KHI GỬI THÀNH CÔNG
                })
                .catch(err => {
                    loading.style.display = "none";
                    document.body.style.overflow = "";
                    alert("Có lỗi xảy ra, vui lòng thử lại sau");
                    console.error(err);
                });
        });
    }


    /* ===== SCRIPT ĐẾM NGƯỢC ===== */

    document.querySelectorAll('.countdown').forEach(el => {

        const targetTime = new Date(el.dataset.time).getTime();

        setInterval(() => {
            const now = Date.now();
            const distance = targetTime - now;

            if (distance <= 0) {
                el.innerHTML = "💖 Đã đến ngày cưới!";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((distance / (1000 * 60)) % 60);
            const seconds = Math.floor((distance / 1000) % 60);

            el.innerHTML =
                `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
        }, 1000);

    });
    /* ===== Script này giúp khi scroll tới section mới chạy ===== */

    const invitationBox = document.querySelector('.invitation-box');

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    invitationBox.classList.add('show');
                }
            });
        },
        { threshold: 0.3 }
    );
    if (invitationBox) {
        observer.observe(invitationBox);
    }

    /* ===== chú rể ===== */
    const groomSection = document.querySelector('.groom-section');

    const groomObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    groomSection.classList.add('show');
                }
            });
        },
        { threshold: 0.3 }
    );
    if (groomSection) {
        groomObserver.observe(groomSection);
    }

    /* ===== cô dâu ===== */

    const brideSection = document.querySelector('.bride-section');

    const brideObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    brideSection.classList.add('show');
                }
            });
        },
        { threshold: 0.3 }
    );

    if (brideSection) {
        brideObserver.observe(brideSection);
    }
    /* ===== chuyện chúng mình ===== */
    const scrollElements = document.querySelectorAll('.scroll-animate');

    const elementInView = (el, offset = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return elementTop <= (window.innerHeight - offset);
    };

    const displayScrollElement = (el) => {
        el.classList.add('active');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', handleScrollAnimation);

    /* ===== time line day 1 ===== */
    const scrollItems = document.querySelectorAll('.scroll-animate');

    const showOnScroll = () => {
        scrollItems.forEach(item => {
            const top = item.getBoundingClientRect().top;
            if (top < window.innerHeight - 120) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', showOnScroll);
    /* ===== gift box ===== */
    const giftBox = document.querySelector('.gift-box');
    const giftImage = document.querySelector('.gift-image');

    const giftObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (giftBox) giftBox.classList.add('show');
                    if (giftImage) giftImage.classList.add('show');
                }
            });
        },
        { threshold: 0.3 }
    );
    if (giftBox) {
        giftObserver.observe(giftBox);
    }

    /* ===== toggle ===== */
    const buttons = document.querySelectorAll('.toggle-btn');
    const boxes = document.querySelectorAll('.family-box');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {

            // remove active
            buttons.forEach(b => b.classList.remove('active'));
            boxes.forEach(box => box.classList.remove('active'));

            // add active
            btn.classList.add('active');
            document.getElementById(btn.dataset.target).classList.add('active');
        });
    });

    /* ===== music ===== */
    const music = document.getElementById('bg-music');
    const btn = document.getElementById('music-btn');

    let isPlaying = false;

    btn.addEventListener('click', () => {
        if (!isPlaying) {
            music.play();
            btn.innerHTML = '🎵';
        } else {
            music.pause();
            btn.innerHTML = '🔇';
        }
        isPlaying = !isPlaying;
    });
    /* ===== Time rơi ===== */
    function createFallingHeart() {
        const el = document.createElement('div');
        el.className = 'falling-heart';

        const colors = ['#ff1e56', '#f4a3b4']; // đỏ + hồng nhạt

        el.style.color = colors[Math.floor(Math.random() * colors.length)];

        el.innerHTML = '<span class="heart-inner">❤</span>';

        el.style.left = Math.random() * 100 + 'vw';
        el.style.fontSize = (14 + Math.random() * 16) + 'px';
        el.style.animationDuration = (4 + Math.random() * 4) + 's';

        document.body.appendChild(el);

        setTimeout(() => {
            el.remove();
        }, 9000);
    }

    // Tạo tim mỗi 300ms
    setInterval(createFallingHeart, 300);

    /* ===== QR full size ===== */
    const qrThumbs = document.querySelectorAll(".qr-thumb");
    const overlay = document.getElementById("qr-overlay");
    const qrFull = document.getElementById("qr-full");
    if (overlay && qrFull && qrThumbs.length) {
        qrThumbs.forEach(img => {
            img.addEventListener("click", () => {
                qrFull.src = img.src;
                overlay.style.display = "flex";
                document.body.style.overflow = "hidden";
            });
        });
        // Click ra ngoài để đóng
        overlay.addEventListener("click", () => {
            overlay.style.display = "none";
            qrFull.src = "";
            document.body.style.overflow = "";
        });

    }
});



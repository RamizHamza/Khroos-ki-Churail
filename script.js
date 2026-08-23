/* =========================================================
   A GIFT FOR CHURAIL — MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const scenes = document.querySelectorAll(".scene");

    const passwordInput = document.getElementById("passwordInput");
    const passwordToggle = document.getElementById("passwordToggle");
    const unlockBtn = document.getElementById("unlockBtn");
    const passwordNoBtn = document.getElementById("passwordNoBtn");
    const hintBox = document.getElementById("hintBox");
    const passwordFeedback = document.getElementById("passwordFeedback");

    const backgroundMusic = document.getElementById("backgroundMusic");
    const birthdayMusic = document.getElementById("birthdayMusic");
    const musicControl = document.getElementById("musicControl");
    const birthdaySongBtn = document.getElementById("birthdaySongBtn");

    const birthdayIntroVideo = document.getElementById("birthdayIntroVideo");

    const photoLightbox = document.getElementById("photoLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closePhotoLightbox = document.getElementById("closePhotoLightbox");

    const videoModal = document.getElementById("videoModal");
    const memoryVideo = document.getElementById("memoryVideo");
    const closeVideoModal = document.getElementById("closeVideoModal");

    const blowCandlesBtn = document.getElementById("blowCandlesBtn");
    const cutCakeBtn = document.getElementById("cutCakeBtn");
    const luxuryCake = document.getElementById("luxuryCake");
    const cakeMessage = document.getElementById("cakeMessage");

    const giftBox = document.getElementById("giftBox");
    const openGiftBtn = document.getElementById("openGiftBtn");
    const giftReveal = document.getElementById("giftReveal");

    const letterText = document.getElementById("letterText");

    const loadingProgress = document.getElementById("loadingProgress");
    const loadingText = document.getElementById("loadingText");

    const globalHeartContainer =
        document.getElementById("globalHeartContainer");

    const heartField = document.getElementById("heartField");

    const fireworks =
        document.getElementById("fireworks");

    const toast =
        document.getElementById("toast");


    /* =====================================================
       SETTINGS
    ===================================================== */

    const PASSWORD = "King3386";

    let currentScene = "intro";
    let musicStarted = false;
    let birthdaySongPlaying = false;
    let cakeCandlesBlown = false;
    let cakeCut = false;
    let giftOpened = false;

    let toastTimer;

    function showFeedback(elementId, message) {
    const element = document.getElementById(elementId);

    if (!element) return;

    element.textContent = message;
    element.classList.add("show");

    setTimeout(() => {
        element.classList.remove("show");
    }, 3000);
}


    /* =====================================================
       SCENE NAVIGATION
    ===================================================== */

    function showScene(sceneName) {

        const target = document.getElementById(
            `scene-${sceneName}`
        );

        if (!target) {
            console.warn(`Scene not found: ${sceneName}`);
            return;
        }

        scenes.forEach(scene => {
            scene.classList.remove("active");
        });

        target.classList.add("active");

        currentScene = sceneName;

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        onSceneEnter(sceneName);
    }


    /* =====================================================
       SCENE ENTER EVENTS
    ===================================================== */

    function onSceneEnter(sceneName) {

        if (sceneName === "welcome") {
            createHearts(8);
        }

        if (sceneName === "heart-question") {
            createHeartField();
        }

        if (sceneName === "birthday-intro") {

            if (birthdayIntroVideo) {
                birthdayIntroVideo.currentTime = 0;
            }

            setTimeout(() => {
                try {
                    birthdayIntroVideo?.play();
                } catch (error) {
                    console.log("Video autoplay blocked.");
                }
            }, 400);
        }

        if (sceneName === "birthday-message") {
            createHearts(12);
        }

        if (sceneName === "cake") {
            resetCake();
        }

        if (sceneName === "letter") {
            typeLetter();
        }

        if (sceneName === "final-wish") {
            launchFinalCelebration();
        }
    }


    /* =====================================================
       INTRO LOADER
    ===================================================== */

    let progress = 0;

    const introLoader = setInterval(() => {

        progress += Math.floor(Math.random() * 5) + 2;

        if (progress >= 100) {
            progress = 100;
            clearInterval(introLoader);
        }

        if (loadingProgress) {
            loadingProgress.style.width = `${progress}%`;
        }

        if (loadingText) {

            if (progress < 35) {
                loadingText.textContent =
                    "Preparing something unforgettable...";
            } else if (progress < 70) {
                loadingText.textContent =
                    "Adding a little magic...";
            } else if (progress < 95) {
                loadingText.textContent =
                    "Almost ready, Chuzii...";
            } else {
                loadingText.textContent =
                    "Your surprise is ready. ❤️";
            }
        }

    }, 100);


    /* =====================================================
       INTRO → PASSWORD
       ===================================================== */

    setTimeout(() => {

        if (currentScene === "intro") {
            showScene("password");
        }

    }, 5200);


    /* =====================================================
       PASSWORD VISIBILITY
       ===================================================== */

    if (passwordToggle) {

        passwordToggle.addEventListener("click", () => {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";
                passwordToggle.textContent = "🙈";

            } else {

                passwordInput.type = "password";
                passwordToggle.textContent = "👁";
            }

        });
    }


    /* =====================================================
       PASSWORD CHECK
       ===================================================== */

    function checkPassword() {

        const entered =
            passwordInput.value.trim();

        if (!entered) {

            showFeedback(
                "passwordFeedback",
                "Password likho pehle 😭"
            );

            return;
        }

        if (entered === PASSWORD) {

            showFeedback(
                "passwordFeedback",
                "Access granted. Welcome, Chuzii ❤️"
            );

            createHearts(15);

            setTimeout(() => {
                showScene("identity");
            }, 1000);

        } else {

            showFeedback(
                "passwordFeedback",
                "Wrong password 😭 Try again, Chuzii."
            );

            passwordInput.classList.add("shake");

            setTimeout(() => {
                passwordInput.classList.remove("shake");
            }, 500);
        }
    }


    if (unlockBtn) {
        unlockBtn.addEventListener(
            "click",
            checkPassword
        );
    }


    if (passwordInput) {

        passwordInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {
                    checkPassword();
                }

            }
        );
    }


    /* =====================================================
       PASSWORD NO / HINT
       ===================================================== */

    if (passwordNoBtn) {

        passwordNoBtn.addEventListener(
            "click",
            () => {

                if (hintBox) {
                    hintBox.classList.add("show");
                }

                showToast(
                    "Wrong answer 😭 Hint unlocked 👑"
                );
            }
        );
    }


    /* =====================================================
       ALL YES BUTTONS
       ===================================================== */

    document.querySelectorAll(
        "[data-next]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const nextScene =
                    button.dataset.next;

                if (!nextScene) return;

                createHearts(5);

                showScene(nextScene);
            }
        );
    });


    /* =====================================================
       ALL NO BUTTONS
       ===================================================== */

    document.querySelectorAll(
        "[data-no-response]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const type =
                    button.dataset.noResponse;

                showNoResponse(type);

            }
        );
    });


    function showNoResponse(type) {

        const response =
            document.getElementById(
                `no-response-${type}`
            );

        if (!response) return;

        const messages = {

            identity:
                "Wrong answer 😏 Nice try, Chuzii.",

            welcome:
                "You can't escape your own birthday surprise 😂",

            video:
                "Nope. The director says WATCH IT. 🎬😂",

            message:
                "Shy mode activated 🙈❤️",

            memories:
                "Enough? Impossible. There are only 4... for now. 😏",

            "our-videos":
                "Maybe later? Suspicious behavior detected. 👀",

            heart:
                "Then Mr Khroos has to remind you... you're VERY special. ❤️",

            photo:
                "Nope? That photo says otherwise 😭😂",

            funny:
                "Nice attempt. The website has decided NO. 😂",

            song:
                "Skip the birthday song? That's illegal today. 😭🎂",

            "cake-slice":
                "You don't want cake? Chuzii, seriously? 😂🍰",

            letter:
                "That's enough? I don't believe you. 🥺❤️"
        };

        response.textContent =
            messages[type] ||
            "Nice try 😏";

        response.classList.add("show");

        buttonShake(
            document.querySelector(
                `[data-no-response="${type}"]`
            )
        );

        setTimeout(() => {
            response.classList.remove("show");
        }, 3000);
    }


    /* =====================================================
       BUTTON SHAKE
       ===================================================== */

    function buttonShake(button) {

        if (!button) return;

        button.classList.add("shake");

        setTimeout(() => {
            button.classList.remove("shake");
        }, 500);
    }


    /* =====================================================
       MUSIC
       ===================================================== */

    function startBackgroundMusic() {

        if (!backgroundMusic) return;

        if (musicStarted) return;

        backgroundMusic.volume = 1;

        const promise =
            backgroundMusic.play();

        if (promise !== undefined) {

            promise
                .then(() => {
                    musicStarted = true;
                    updateMusicIcon();
                })
                .catch(() => {
                    console.log(
                        "Music waiting for user interaction."
                    );
                });
        }
    }


    document.addEventListener(
        "click",
        () => {
            startBackgroundMusic();
        },
        { once: true }
    );


    /* =====================================================
       MUSIC CONTROL
       ===================================================== */

    if (musicControl) {

        musicControl.addEventListener(
            "click",
            () => {

                if (
                    backgroundMusic &&
                    !backgroundMusic.paused
                ) {

                    backgroundMusic.pause();

                } else if (backgroundMusic) {

                    backgroundMusic.play()
                        .then(() => {
                            musicStarted = true;
                            updateMusicIcon();
                        })
                        .catch(() => {});
                }

                updateMusicIcon();
            }
        );
    }


    function updateMusicIcon() {

        if (!musicControl) return;

        if (
            backgroundMusic &&
            !backgroundMusic.paused
        ) {

            musicControl.textContent = "🔊";

        } else {

            musicControl.textContent = "🔇";
        }
    }


    /* =====================================================
       BIRTHDAY SONG
       ===================================================== */

    if (birthdaySongBtn) {

        birthdaySongBtn.addEventListener(
            "click",
            () => {

                if (!birthdayMusic) return;

                if (birthdayMusic.paused) {

                    backgroundMusic?.pause();

                    birthdayMusic.currentTime = 0;
                    birthdayMusic.volume = 1;

                    birthdayMusic.play()
                        .then(() => {

                            birthdaySongPlaying = true;

                            birthdaySongBtn.innerHTML =
                                "⏸ Pause Birthday Song";

                        })
                        .catch(() => {

                            showToast(
                                "Tap again to play the birthday song 🎶"
                            );

                        });

                } else {

                    birthdayMusic.pause();

                    birthdaySongPlaying = false;

                    birthdaySongBtn.innerHTML =
                        "▶ Play Birthday Song";
                }

            }
        );
    }


    if (birthdayMusic) {

        birthdayMusic.addEventListener(
            "ended",
            () => {

                birthdaySongPlaying = false;

                if (birthdaySongBtn) {
                    birthdaySongBtn.innerHTML =
                        "▶ Play Birthday Song";
                }

                startBackgroundMusic();
            }
        );
    }


    /* =====================================================
       PAUSE MUSIC WHEN VIDEO PLAYS
       ===================================================== */

    if (birthdayIntroVideo) {

        birthdayIntroVideo.addEventListener(
            "play",
            () => {
                backgroundMusic?.pause();
            }
        );

        birthdayIntroVideo.addEventListener(
            "ended",
            () => {
                startBackgroundMusic();
            }
        );
    }


    /* =====================================================
       PHOTO LIGHTBOX
       ===================================================== */

    document.querySelectorAll(
        ".memory-card"
    ).forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const image =
                    card.dataset.image;

                if (!image) return;

                lightboxImage.src = image;

                photoLightbox.classList.add(
                    "active"
                );

                photoLightbox.setAttribute(
                    "aria-hidden",
                    "false"
                );
            }
        );
    });


    function closePhoto() {

        photoLightbox.classList.remove(
            "active"
        );

        photoLightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        lightboxImage.src = "";
    }


    closePhotoLightbox?.addEventListener(
        "click",
        closePhoto
    );


    photoLightbox?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                photoLightbox
            ) {
                closePhoto();
            }

        }
    );


    /* =====================================================
       VIDEO MEMORY MODAL
       ===================================================== */

    document.querySelectorAll(
        ".video-card"
    ).forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const video =
                    card.dataset.video;

                if (!video) return;

                memoryVideo.src = video;

                videoModal.classList.add(
                    "active"
                );

                videoModal.setAttribute(
                    "aria-hidden",
                    "false"
                );

                backgroundMusic?.pause();

                memoryVideo.play()
                    .catch(() => {});
            }
        );
    });


    function closeVideo() {

        memoryVideo.pause();

        memoryVideo.currentTime = 0;
        memoryVideo.src = "";

        videoModal.classList.remove(
            "active"
        );

        videoModal.setAttribute(
            "aria-hidden",
            "true"
        );

        startBackgroundMusic();
    }


    closeVideoModal?.addEventListener(
        "click",
        closeVideo
    );


    videoModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                videoModal
            ) {
                closeVideo();
            }

        }
    );


    /* =====================================================
       ESC KEY FOR MODALS
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") return;

            closePhoto();
            closeVideo();

        }
    );


    /* =====================================================
       HEARTS
       ===================================================== */

    function createHearts(amount = 10) {

        if (!globalHeartContainer) return;

        for (let i = 0; i < amount; i++) {

            const heart =
                document.createElement("span");

            heart.className =
                "floating-heart";

            heart.textContent =
                Math.random() > 0.5
                    ? "❤️"
                    : "♡";

            heart.style.left =
                `${Math.random() * 100}%`;

            heart.style.animationDuration =
                `${4 + Math.random() * 4}s`;

            heart.style.animationDelay =
                `${Math.random() * 1.5}s`;

            globalHeartContainer.appendChild(
                heart
            );

            setTimeout(() => {
                heart.remove();
            }, 9000);
        }
    }


    /* =====================================================
       HEART FIELD
       ===================================================== */

    function createHeartField() {

        if (!heartField) return;

        heartField.innerHTML = "";

        for (let i = 0; i < 20; i++) {

            const heart =
                document.createElement("span");

            heart.className =
                "field-heart";

            heart.textContent = "❤";

            heart.style.left =
                `${Math.random() * 100}%`;

            heart.style.top =
                `${Math.random() * 100}%`;

            heart.style.animationDelay =
                `${Math.random() * 3}s`;

            heartField.appendChild(
                heart
            );
        }
    }


    /* =====================================================
       CAKE RESET
       ===================================================== */

    function resetCake() {

        cakeCandlesBlown = false;
        cakeCut = false;

        if (blowCandlesBtn) {
            blowCandlesBtn.classList.remove(
                "hidden"
            );
        }

        if (cutCakeBtn) {
            cutCakeBtn.classList.add(
                "hidden"
            );
        }

        if (cakeMessage) {
            cakeMessage.textContent =
                "Close your eyes... make a wish. ✨";
        }

        document.querySelectorAll(
            ".flame"
        ).forEach(flame => {

            flame.classList.remove(
                "extinguished"
            );

        });

        luxuryCake?.classList.remove(
            "cake-cut"
        );
    }


    /* =====================================================
       BLOW CANDLES
       ===================================================== */

    blowCandlesBtn?.addEventListener(
        "click",
        () => {

            if (cakeCandlesBlown) return;

            cakeCandlesBlown = true;

            document.querySelectorAll(
                ".flame"
            ).forEach(flame => {

                flame.classList.add(
                    "extinguished"
                );

            });

            if (cakeMessage) {
                cakeMessage.textContent =
                    "Wish made? Perfect... now let's cut the cake. 🎂❤️";
            }

            blowCandlesBtn.classList.add(
                "hidden"
            );

            cutCakeBtn.classList.remove(
                "hidden"
            );

            createConfetti(35);
            createHearts(15);
        }
    );


    /* =====================================================
       CUT CAKE
       ===================================================== */

    cutCakeBtn?.addEventListener(
        "click",
        () => {

            if (!cakeCandlesBlown) {

                showToast(
                    "First blow the candles 😭🕯️"
                );

                return;
            }

            if (cakeCut) return;

            cakeCut = true;

            luxuryCake?.classList.add(
                "cake-cut"
            );

            cakeMessage.textContent =
                "Cake successfully cut! 🍰 One piece reserved for Chuzii. ❤️";

            createConfetti(60);

            setTimeout(() => {
                showScene("cake-slice");
            }, 1800);
        }
    );


    /* =====================================================
       GIFT
       ===================================================== */

    openGiftBtn?.addEventListener(
        "click",
        () => {

            if (giftOpened) return;

            giftOpened = true;

            giftBox?.classList.add(
                "opened"
            );

            giftReveal?.classList.add(
                "show"
            );

            openGiftBtn.classList.add(
                "hidden"
            );

            createConfetti(80);
            createHearts(25);

            showToast(
                "Surprise unlocked ❤️"
            );

            setTimeout(() => {

                showScene("letter");

            }, 3500);
        }
    );


    /* =====================================================
       LETTER
       ===================================================== */

    const letterContent =
        `Dear Chuzii,

Happy Birthday to one of the most special people in my life. ❤️

You have your own crazy way of making ordinary moments memorable, and honestly, life would be a lot less fun without your drama, your smile, your jokes and that little bit of "Churail" energy. 😂

I hope this new year of your life brings you happiness, peace, success and countless reasons to smile.

May Allah protect you, bless you and give you everything that is best for you.

Keep smiling, keep shining and keep being the beautiful person you are.

Once again...

Happy Birthday, Chuzii. ❤️

— Mr Khroos`;

    let letterStarted = false;

    function typeLetter() {

        if (letterStarted) return;

        if (!letterText) return;

        letterStarted = true;

        letterText.textContent = "";

        let index = 0;

        const typingSpeed = 25;

        function typeNext() {

            if (index >= letterContent.length) {
                return;
            }

            letterText.textContent +=
                letterContent[index];

            index++;

            setTimeout(
                typeNext,
                typingSpeed
            );
        }

        typeNext();
    }


    /* =====================================================
       FINAL CELEBRATION
       ===================================================== */

    function launchFinalCelebration() {

        createHearts(30);
        createConfetti(100);

        startFireworks();

        setTimeout(() => {
            createConfetti(70);
        }, 2500);

        setTimeout(() => {
            createHearts(20);
        }, 4000);
    }


    /* =====================================================
       FIREWORKS
       ===================================================== */

    function startFireworks() {

        if (!fireworks) return;

        fireworks.innerHTML = "";

        for (let i = 0; i < 12; i++) {

            setTimeout(() => {

                createFirework();

            }, i * 450);
        }
    }


    function createFirework() {

        if (!fireworks) return;

        const centerX =
            Math.random() * 80 + 10;

        const centerY =
            Math.random() * 55 + 10;

        for (let i = 0; i < 18; i++) {

            const spark =
                document.createElement("span");

            spark.className =
                "firework-spark";

            const angle =
                (Math.PI * 2 * i) / 18;

            const distance =
                40 + Math.random() * 70;

            spark.style.left =
                `${centerX}%`;

            spark.style.top =
                `${centerY}%`;

            spark.style.setProperty(
                "--x",
                `${Math.cos(angle) * distance}px`
            );

            spark.style.setProperty(
                "--y",
                `${Math.sin(angle) * distance}px`
            );

            fireworks.appendChild(
                spark
            );

            setTimeout(() => {
                spark.remove();
            }, 1300);
        }
    }


    /* =====================================================
       CONFETTI
       ===================================================== */

    function createConfetti(amount = 40) {

        const container =
            document.getElementById(
                "confettiContainer"
            );

        if (!container) return;

        for (let i = 0; i < amount; i++) {

            const piece =
                document.createElement("span");

            piece.className =
                "confetti-piece";

            piece.style.left =
                `${Math.random() * 100}%`;

            piece.style.animationDelay =
                `${Math.random() * 1.5}s`;

            piece.style.animationDuration =
                `${2.5 + Math.random() * 2.5}s`;

            piece.style.transform =
                `rotate(${Math.random() * 360}deg)`;

            container.appendChild(
                piece
            );

            setTimeout(() => {
                piece.remove();
            }, 6000);
        }
    }


    /* =====================================================
       TOAST
       ===================================================== */

    function showToast(message) {

        if (!toast) return;

        clearTimeout(toastTimer);

        toast.textContent = message;

        toast.classList.add("show");

        toastTimer = setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3000);
    }


    /* =====================================================
       KEYBOARD SHORTCUT
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                currentScene === "password"
            ) {
                checkPassword();
            }

        }
    );


    /* =====================================================
       DISABLE CONTEXT MENU
       ===================================================== */

    document.addEventListener(
        "contextmenu",
        event => {
            event.preventDefault();
        }
    );


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    updateMusicIcon();

});
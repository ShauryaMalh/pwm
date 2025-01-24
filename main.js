document.addEventListener("DOMContentLoaded", function () {
    const letter = document.querySelector('.Letter');
    const paper = document.querySelector('.Paper');
    const hint = document.querySelector('.Paper_hint');
    const content = document.querySelector('.Paper_content');
    const underlines = document.querySelectorAll('u');
    const p1 = document.querySelector('.p1');
    const p2 = document.querySelector('.p2');
    const p3 = document.querySelector('.p3');
    const p4 = document.querySelector('.p4');
    const signature = document.querySelector('.Paper_signature');

    // Function to split text into spans
    function splitText(element, type = "words") {
        const text = element.textContent;
        element.innerHTML = text
            .split(type === "words" ? " " : "")
            .map((part) => `<span>${part}${type === "words" ? " " : ""}</span>`)
            .join("");
        return Array.from(element.querySelectorAll('span'));
    }

    // Apply splitText to elements
    const p1Words = splitText(p1, "words");
    const p2Words = splitText(p2, "words");
    const p3Words = splitText(p3, "words");
    const p4Words = splitText(p4, "words");
    const signatureChars = splitText(signature, "chars");

    // Hide text content initially
    [p1, p2, p3, p4, signature].forEach((el) => (el.style.opacity = "0"));

    const scaleY = letter.getBoundingClientRect().height / paper.getBoundingClientRect().height;

    // STEP 1
    const letterIn = () => {
        letter.style.transition = "transform 1.5s ease-out";
        letter.style.transform = "rotateX(0deg)";
        letter.style.transformOrigin = "center center";
        letter.style.opacity = "1";
        letter.style.transform = "scale(0) translateY(300px)";
    };

    const paperPeek = () => {
        paper.style.transition = "transform 0.8s ease-out, opacity 0.8s ease-out";
        paper.style.transform = `translateY(-100%) scaleX(0.95) scaleY(0.78)`; // Paper is hidden above
        paper.style.opacity = "0";

        setTimeout(() => {
            paper.style.transform = `translateY(-55%) scaleX(0.95) scaleY(0.78)`; // Move paper behind the letter
            paper.style.opacity = "1";
        }, 0);
    };

    // STEP 2
    const letterOut = () => {
        letter.style.transform = "translateY(300px)";
        letter.style.opacity = "0";
    };

    const paperIn = () => {
        paper.style.transition = "all 1s ease-in-out";
        paper.style.transform = "translateY(0) scale(1)";
    };

    // STEP 3
    const contentIn = async () => {
        const animateSpans = async (spans) => {
            for (let i = 0; i < spans.length; i++) {
                const span = spans[i];
                span.style.transition = "all 0.6s ease";
                span.style.transform = "translateY(5px)";
                span.style.opacity = "1";
                await new Promise((resolve) => setTimeout(resolve, 50)); // Wait between spans
            }
        };
    
        const paragraphs = [
            { element: p1, spans: p1Words },
            { element: p2, spans: p2Words },
            { element: p3, spans: p3Words },
            { element: p4, spans: p4Words },
        ];
    
        for (let i = 0; i < paragraphs.length; i++) {
            const { element, spans } = paragraphs[i];
    
            element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            element.style.opacity = "0";
            element.style.transform = "translateY(20px)";
    
            await new Promise((resolve) => setTimeout(resolve, 500));
    
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
    
            await animateSpans(spans);
    
            await new Promise((resolve) => setTimeout(resolve, 500));
        }
    
        // Show buttons after content animation
        document.querySelector('.button-container').classList.remove('hidden');
        
    };
    
    
    
    

    const signatureIn = () => {
        signature.style.opacity = "1";
        signatureChars.forEach((char, index) => {
            setTimeout(() => {
                char.style.transition = "opacity 0.5s ease, transform 0.1s ease";
                char.style.opacity = "1";
                char.style.transform = "translateX(-10px)";
            }, index * 100);
        });
    };

    // Initial animations
    paperPeek();

    // Trigger the animation
    document.querySelector('.container').style.opacity = "1";

    letter.addEventListener('click', async function () {
        // Step 1: Bring the letter in
        letterIn();

        // Step 2: After the letter is fully in, fade it out and revert paper size
        setTimeout(() => {
            letterOut(); // Fade out the letter
            paperIn();   // Revert paper to full size
        }, 1500); // Delay matches letterIn's duration

        // Step 3: Hide the letter completely after fading out
        setTimeout(() => {
            letter.style.display = "none"; // Hide the letter
        }, 3500); // Delay matches letterOut's duration

        // Step 4: Show content and signature animations sequentially
        setTimeout(async () => {
            hint.style.opacity = "0";
            await contentIn();
            signatureIn();
        }, 2000); // Start content animation after letterOut begins
    });

    // Final steps
    underlines.forEach(u => {
        u.classList.add('is-underlined');
    });
});

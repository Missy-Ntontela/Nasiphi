let menuIcon=document.querySelector('#menu-icon');
let navbar=document.querySelector('.navbar');

if(menuIcon && navbar){
    menuIcon.onclick=() =>{
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}

let sections=document.querySelectorAll('section');
let navLinks=document.querySelectorAll('header nav a');

window.onscroll= () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top>= offset && top <offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                //document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                let activeLink = document.querySelector('header nav a[href*=' + id + ']');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
                
            });
        };
    });
    let header=document.querySelector('header');
    if(header){
        header.classList.toggle('sticky',window.scrollY>100);
    }
    if(menuIcon && navbar){
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
};

ScrollReveal({
    //reset:true,
    distance:'80px',
    duration:2000,
    delay:200
});

ScrollReveal().reveal('.home-content, .heading',{origin:'top' });
ScrollReveal().reveal('.home-img, .services-container, .projects-box, .contact-form',{origin:'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img',{origin:'left'});
ScrollReveal().reveal('.home-content p, .about-content',{origin:'right'});


const typed = new Typed(".multiple-text",{
    strings: [
        'Junior Frontend Developer',
        'Computer Science Student',
        'Full-Stack Developer in Training',
        'Problem Solver',
        'UI Enthusiast',
        'Lifelong Learner'
    ],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
});

/* ── Particle Background ── */
(function(){
    const canvas = document.getElementById('particles-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 80;
    const MAX_SIZE = 3;
    const SPEED = 0.4;
    const LINK_DIST = 120;

    function resize(){
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle{
        constructor(){
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * MAX_SIZE + 0.5;
            this.speedX = (Math.random() - 0.5) * SPEED;
            this.speedY = (Math.random() - 0.5) * SPEED;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update(){
            this.x += this.speedX;
            this.y += this.speedY;
            if(this.x < 0 || this.x > canvas.width)  this.speedX *= -1;
            if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(182,137,182,${this.opacity})`;
            ctx.fill();
        }
    }

    for(let i = 0; i < PARTICLE_COUNT; i++){
        particles.push(new Particle());
    }

    function connectParticles(){
        for(let a = 0; a < particles.length; a++){
            for(let b = a + 1; b < particles.length; b++){
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if(dist < LINK_DIST){
                    const opacity = 0.15 * (1 - dist / LINK_DIST);
                    ctx.strokeStyle = `rgba(182,137,182,${opacity})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animate);
    }
    animate();
})();

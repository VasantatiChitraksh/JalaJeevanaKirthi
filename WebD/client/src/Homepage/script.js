document.addEventListener('scroll', function() {
  
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = Math.min(scrollTop / maxScroll, 1);


    const startColor = [38, 174, 232]; 
    const endColor = [10, 25, 74]; 

   
    const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * scrollFraction);
    const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * scrollFraction);
    const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * scrollFraction);

    document.querySelector('.background').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});

window.addEventListener('scroll', function() {
    const footer = document.querySelector('footer');
    const footerPosition = footer.getBoundingClientRect();

    if (footerPosition.top < window.innerHeight) {
        document.querySelector('.whale').style.display = 'block';
    } else {
        document.querySelector('.whale').style.display = 'none';
    }
});

// navigation script
function nav() {

    var pages = [
        { name: 'Home', link: 'index.html' },
        { name: 'About Me', link: 'aboutme.html' },
        { name: 'Gallery', link: 'gallery.html' },
        { name: 'Projects', link: 'projects.html' },
        //{ name: 'Magic', link: 'magic.html' },
        { name: 'Resume', link: 'resume.html' },
        { name: 'Contact', link: 'contact.html' }
        // not including wireframe.html & comments.html
    ]; 

    var navLinks = document.getElementById('navLinks');
    var activePage = window.location.pathname.split("/").pop();

    pages.forEach(function(page) {
        var link = document.createElement("a");
        link.href = page.link;
        link.textContent = page.name;
    

        if (activePage === page.link) {
        link.removeAttribute("href");
    }

        navLinks.appendChild(link); 

}); 

}

// footer script

function footer() {

    let foot = `
        <div class="foot-links">&copy; <i>2024</i>. Monica Paultre. <i><a href="mailto:paulmj1@mail.broward.edu">paulmj1@mail.broward.edu</a>.</i> All Rights Reserved.
        </div>
            `;

    foot += `
        <div class="foot-div">
         <a href="comments.html">Comments</a> | <a href="wireframes.html">Wireframes</a>
        </div>
        `;

      document.getElementById('footer').innerHTML = foot;
}

nav();
footer();


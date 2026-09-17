import 'styles.css'

// Edit these four values to customize the site.
const business = {
  name: "John Schottler",
  phone: "715.410.9079",          // Example: (360) 555-0123
  phoneHref: "tel:+17154109079", // Replace with your actual number
  email: "jcschottler1991@gmail.com",          // Example: you@example.com
  serviceArea: "Bow, Bellingham, Burlington, Sedro Woolley areas"
};

document.title = `${business.name} | Handyman`;
document.getElementById("brandName").textContent = business.name;
document.getElementById("footerName").textContent = business.name;
document.getElementById("phoneText").textContent = business.phone;
document.getElementById("emailText").textContent = business.email;
document.getElementById("serviceArea").textContent = business.serviceArea;

document.getElementById("callButton").href = business.phoneHref;
document.getElementById("phoneLink").href = business.phoneHref;

const mailto = `mailto:${business.email}`;
document.getElementById("emailButton").href = mailto;
document.getElementById("emailLink").href = mailto;

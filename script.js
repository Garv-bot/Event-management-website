const events = [
  {id:"neon-nights",title:"Neon Nights: Live Sessions",category:"Music",date:"2026-12-12",time:"7:00 PM onwards",venue:"Ekamra Haat, Bhubaneswar",price:"₹499 onwards",image:"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1000&q=85",short:"An electric evening of indie sounds, immersive lights and good company.",description:"Step into a night built around live music, creative energy and shared moments. Discover emerging artists, enjoy an atmospheric outdoor setup and make a night of it with your favourite people.",featured:true},
  {id:"future-forward",title:"Future Forward: Tech Summit",category:"Technology",date:"2026-12-19",time:"10:00 AM – 5:00 PM",venue:"KIIT Convention Centre, Bhubaneswar",price:"Free · Registration required",image:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85",short:"A day of big ideas, emerging tech and conversations that move things forward.",description:"Connect with builders, students and technology enthusiasts for a full day of talks and conversations around AI, product thinking, startups and the future of work. Bring your questions and curiosity.",featured:true},
  {id:"canvas-culture",title:"Canvas & Culture Fest",category:"Art & Culture",date:"2027-01-09",time:"11:00 AM – 8:00 PM",venue:"Regional Museum of Natural History, Bhubaneswar",price:"₹199",image:"https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=85",short:"A colourful celebration of visual art, design, music and local creators.",description:"Spend a day exploring independent art, live demonstrations, creative workshops and performances. Meet local creators, discover new perspectives and take home a little inspiration.",featured:false},
  {id:"run-for-good",title:"Run for Good 5K",category:"Community",date:"2027-01-17",time:"6:30 AM onwards",venue:"Kalinga Stadium, Bhubaneswar",price:"₹299",image:"https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=85",short:"Move together for a healthier community and a cause that matters.",description:"Lace up for a friendly 5K community run. Whether you're chasing a personal best or simply showing up, enjoy a positive morning with warm-up activities, refreshments and a shared purpose.",featured:false},
  {id:"design-dialogues",title:"Design Dialogues",category:"Art & Culture",date:"2027-01-24",time:"2:00 PM – 6:00 PM",venue:"The Urban Space, Bhubaneswar",price:"₹349",image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85",short:"An afternoon exploring how design shapes products, spaces and everyday life.",description:"Join designers and curious minds for practical talks, thoughtful discussions and collaborative activities. Explore visual storytelling, user experience and the small details that make ideas work.",featured:false},
  {id:"weekend-market",title:"The Weekend Social Market",category:"Community",date:"2027-02-06",time:"4:00 PM – 9:00 PM",venue:"Janpath, Bhubaneswar",price:"Free entry",image:"https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1000&q=85",short:"Shop small, eat well and spend your evening discovering local makers.",description:"A relaxed community market featuring independent labels, handmade finds, local food and music. Bring friends, support small businesses and enjoy an easy-going evening around the city.",featured:false}
];

const grid = document.getElementById("eventsGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("categoryFilters");
const eventCount = document.getElementById("eventCount");
const emptyState = document.getElementById("emptyState");
const eventModal = document.getElementById("eventModal");
const registerModal = document.getElementById("registerModal");
const registrationForm = document.getElementById("registrationForm");
const eventSelect = document.getElementById("eventSelect");
let activeCategory = "All";

const formatDate = (dateString) => {
  const date = new Date(`${dateString}T12:00:00`);
  return {day:date.toLocaleDateString("en-IN",{day:"2-digit"}),month:date.toLocaleDateString("en-IN",{month:"short"}).toUpperCase(),full:date.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})};
};
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));

function renderEvents(){
  const query = searchInput.value.trim().toLowerCase();
  const filtered = events.filter(event => {
    const matchesCategory = activeCategory === "All" || event.category === activeCategory;
    const haystack = `${event.title} ${event.category} ${event.venue} ${event.short}`.toLowerCase();
    return matchesCategory && haystack.includes(query);
  });
  eventCount.textContent = String(filtered.length).padStart(2,"0");
  emptyState.classList.toggle("hidden",filtered.length !== 0);
  grid.classList.toggle("hidden",filtered.length === 0);
  grid.innerHTML = filtered.map(event => {
    const date = formatDate(event.date);
    return `<article class="event-card" tabindex="0" role="button" aria-label="View details for ${escapeHTML(event.title)}" data-event="${event.id}">
      <div class="event-image"><img src="${event.image}" alt="${escapeHTML(event.title)} event" loading="lazy"><span class="event-category">${escapeHTML(event.category)}</span><span class="event-date-badge"><b>${date.day}</b><small>${date.month}</small></span></div>
      <div class="event-info"><div class="event-meta"><span>◷ ${escapeHTML(event.time)}</span></div><h3>${escapeHTML(event.title)}</h3><p>${escapeHTML(event.short)}</p><div class="card-bottom"><span>⌖ ${escapeHTML(event.venue)}</span><b>${escapeHTML(event.price)}</b><span class="card-arrow">↗</span></div></div>
    </article>`;
  }).join("");
}
function openModal(modal){modal.classList.remove("hidden");document.body.style.overflow="hidden";}
function closeModal(modal){modal.classList.add("hidden");document.body.style.overflow="";}
function showEvent(id){
  const event = events.find(item=>item.id===id); if(!event)return;
  const date = formatDate(event.date);
  document.getElementById("eventModalContent").innerHTML = `<div class="detail-image"><img src="${event.image}" alt="${escapeHTML(event.title)}"></div><div class="detail-body"><span class="detail-category">${escapeHTML(event.category.toUpperCase())}</span><h2 id="modalTitle">${escapeHTML(event.title)}</h2><p>${escapeHTML(event.description)}</p><div class="detail-facts"><span><b>DATE</b>${date.full}</span><span><b>TIME</b>${escapeHTML(event.time)}</span><span><b>VENUE</b>${escapeHTML(event.venue)}</span></div><div class="detail-footer"><small>${escapeHTML(event.price)}</small><button class="button button-primary" id="detailRegister">Register for this event <span>↗</span></button></div></div>`;
  document.getElementById("detailRegister").addEventListener("click",()=>{closeModal(eventModal);openRegistration(id);});
  openModal(eventModal);
}
function openRegistration(id=""){
  eventSelect.innerHTML = `<option value="">Choose an event</option>` + events.map(e=>`<option value="${e.id}">${escapeHTML(e.title)}</option>`).join("");
  eventSelect.value=id;
  document.getElementById("selectedEventId").value=id;
  registrationForm.classList.remove("hidden");
  document.getElementById("successPanel").classList.add("hidden");
  clearErrors();
  openModal(registerModal);
  document.getElementById("fullName").focus();
}
function clearErrors(){
  ["nameError","emailError","phoneError","eventError","consentError"].forEach(id=>document.getElementById(id).textContent="");
  document.querySelectorAll(".form-row input,.form-row select").forEach(el=>el.classList.remove("invalid"));
}
function setError(fieldId,errorId,message){
  document.getElementById(fieldId).classList.add("invalid");
  document.getElementById(errorId).textContent=message;
}
function validateForm(){
  clearErrors(); let valid=true;
  const name=document.getElementById("fullName"),email=document.getElementById("email"),phone=document.getElementById("phone");
  if(name.value.trim().length<2){setError("fullName","nameError","Please enter your full name (at least 2 characters).");valid=false;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())){setError("email","emailError","Enter a valid email address.");valid=false;}
  const digits=phone.value.replace(/\D/g,"");
  if(!/^[6-9]\d{9}$/.test(digits)){setError("phone","phoneError","Enter a valid 10-digit Indian mobile number.");valid=false;}
  if(!eventSelect.value){setError("eventSelect","eventError","Please select an event.");valid=false;}
  if(!document.getElementById("consent").checked){document.getElementById("consentError").textContent="Please agree to event-related updates to continue.";valid=false;}
  return valid;
}
registrationForm.addEventListener("submit",event=>{
  event.preventDefault();
  if(!validateForm())return;
  const selected=events.find(e=>e.id===eventSelect.value);
  const record={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),name:document.getElementById("fullName").value.trim(),email:document.getElementById("email").value.trim(),phone:document.getElementById("phone").value.trim(),eventId:selected.id,eventTitle:selected.title,registeredAt:new Date().toISOString()};
  try{
    const registrations=JSON.parse(localStorage.getItem("kExploreRegistrations")||"[]");
    registrations.push(record);
    localStorage.setItem("kExploreRegistrations",JSON.stringify(registrations));
    registrationForm.classList.add("hidden");
    document.getElementById("successMessage").textContent=`Thanks, ${record.name}! Your registration for ${record.eventTitle} has been saved on this device.`;
    document.getElementById("successPanel").classList.remove("hidden");
  }catch(error){showToast("Could not save registration. Please check browser storage.");}
});
grid.addEventListener("click",event=>{const card=event.target.closest("[data-event]");if(card)showEvent(card.dataset.event);});
grid.addEventListener("keydown",event=>{if((event.key==="Enter"||event.key===" ")&&event.target.matches("[data-event]")){event.preventDefault();showEvent(event.target.dataset.event);}});
searchInput.addEventListener("input",renderEvents);
filters.addEventListener("click",event=>{const chip=event.target.closest("[data-category]");if(!chip)return;activeCategory=chip.dataset.category;filters.querySelectorAll(".filter-chip").forEach(item=>item.classList.toggle("selected",item===chip));renderEvents();});
document.getElementById("resetFilters").addEventListener("click",()=>{searchInput.value="";activeCategory="All";filters.querySelectorAll(".filter-chip").forEach(item=>item.classList.toggle("selected",item.dataset.category==="All"));renderEvents();});
document.querySelectorAll("[data-close]").forEach(button=>button.addEventListener("click",()=>closeModal(document.getElementById(button.dataset.close))));
[eventModal,registerModal].forEach(modal=>modal.addEventListener("click",event=>{if(event.target===modal)closeModal(modal);}));
document.addEventListener("keydown",event=>{if(event.key==="Escape"){closeModal(eventModal);closeModal(registerModal);}});
document.getElementById("closeSuccess").addEventListener("click",()=>closeModal(registerModal));
document.getElementById("themeToggle").addEventListener("click",()=>{
  document.body.classList.toggle("light");
  const light=document.body.classList.contains("light");
  document.getElementById("themeIcon").textContent=light?"☾":"☼";
  localStorage.setItem("kExploreTheme",light?"light":"dark");
});
if(localStorage.getItem("kExploreTheme")==="light"){document.body.classList.add("light");document.getElementById("themeIcon").textContent="☾";}
document.getElementById("mobileMenu").addEventListener("click",()=>{
  const nav=document.getElementById("mainNav");const opened=nav.classList.toggle("open");
  document.getElementById("mobileMenu").setAttribute("aria-expanded",String(opened));
});
document.querySelectorAll(".main-nav a").forEach(link=>link.addEventListener("click",()=>{document.getElementById("mainNav").classList.remove("open");document.getElementById("mobileMenu").setAttribute("aria-expanded","false");}));
document.getElementById("year").textContent=new Date().getFullYear();
function showToast(message){const toast=document.getElementById("toast");toast.textContent=message;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2600);}
document.addEventListener("keydown",event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==="k"){event.preventDefault();searchInput.focus();}});
renderEvents();

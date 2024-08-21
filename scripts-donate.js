// The script for displaying wallet addresses for donations.
function selectText(e) {
	let t = document.createRange(),
		n = window.getSelection();
	t.selectNodeContents(e), n.removeAllRanges(), n.addRange(t)
}
document.addEventListener("DOMContentLoaded", function() {
	let e = document.getElementById("network"),
		t = document.getElementById("coin"),
		n = document.getElementById("result"),
		o = document.getElementById("address"),
		s = document.getElementById("qr-code"),
		a = document.getElementById("notification");
	fetch("json-donate.json").then(e => e.json()).then(i => {
		let l = new Map,
			r = i.qr_codes;
		Object.keys(i.chains).forEach(e => {
			Object.keys(i.chains[e]).forEach(t => {
				l.has(t) || l.set(t, []), l.get(t).push(e)
			})
		}), l.forEach((e, n) => {
			let o = document.createElement("option");
			o.value = n, o.textContent = n, t.appendChild(o)
		}), t.addEventListener("change", function() {
			let i = t.value;
			if(i) {
				e.innerHTML = '<option value="">Choosing a chain</option>';
				l.get(i).forEach(t => {
					let n = document.createElement("option");
					n.value = t, n.textContent = t, e.appendChild(n)
				}), n.style.display = "none"
			} else e.innerHTML = '<option value="">Choosing a chain</option>', o.textContent = "", s.src = "", a.textContent = "", n.style.display = "none"
		}), e.addEventListener("change", function() {
			let l = e.value,
				d = t.value;
			if(l && d) {
				let c = i.chains[l][d];
				if(c) {
					o.textContent = `${c.address}`;
					let h = r[c.qrcode_address];
					s.src = `data:image/svg+xml;base64,${h}`, n.style.display = "block", selectText(o), a.innerHTML = `The coin <strong>${c.name}</strong> was chosen in the chain <strong>${l}</strong>. <strong><span class="warning-text">Please double-check the details.</span></strong><br><i>Make sure that the address <u>you have chosen</u> is used only for transferring the chosen <strong>${c.name}</strong> coin.<br>Sending other coins to this address may result in the irreversible loss of assets.</i>`
				}
			} else o.textContent = "", s.src = "", a.textContent = "", n.style.display = "none"
		})
	}).catch(e => console.error("Error loading data:", e))
});
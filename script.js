let selection=document.getElementById('selection');
selection.setAttribute('onchange','selector()');
selection.setAttribute('onmousedown','clears()');
let menu=document.getElementById('main-menu');
let subMenu=document.getElementsByClassName('row');

let item=[
	{"Tomato":50,"Minestone":70,"Hot n Sour":90,"Select Item":' - '},
	{"panirTika":90,"panirBhurji":110,"vegKadai":120,"Select Item":' - '},
	{"hakkaNoodels":55,"americanChopcy":70,"manchurian":95,"Select Item":' - '},
	{"masalaDhosa":40,"idliSambhar":50,"uttapam":60,"Select Item":' - '},
	{"orange":20,"pineapple":30,"grapes":40,"Select Item":' - '},
	{"vanila":10,"chocolateChips":20,"Select Item":' - '}
];
const order=[
	{"Tomato":0,"Minestone":0,"Hot n Sour":0,"Select Item":' - '},
	{"panirTika":0,"panirBhurji":0,"vegKadai":0,"Select Item":' - '},
	{"hakkaNoodels":0,"americanChopcy":0,"manchurian":0,"Select Item":' - '},
	{"masalaDhosa":0,"idliSambhar":0,"uttapam":0,"Select Item":' - '},
	{"orange":0,"pineapple":0,"grapes":0,"Select Item":' - '},
	{"vanila":0,"chocolateChips":0,"Select Item":' - '}
]

let active,curItem;

for(let i=0;i<subMenu.length;i++)
{
	subMenu[i].children[0].setAttribute('onChange','calculateChange(this)');
	subMenu[i].children[2].firstElementChild.setAttribute('onChange','calculate(this)');
	subMenu[i].children[2].firstElementChild.setAttribute('onFocus','this.select()');
}
function clears()
{
	selection.value="";
}
function selector() {
	if(selection.value==0)
	{
		menu.classList.add('d-none');
		document.getElementById('buttons').classList.add('d-none');
	}
	else
	{
		document.getElementById('buttons').classList.remove('d-none');
		menu.classList.remove('d-none');

		for(let i=1;i<subMenu.length;i++)
		{
			subMenu[i].children[0].firstElementChild.disabled=true;
			subMenu[i].children[2].firstElementChild.disabled=true;
			if(i==selection.value)
			{
				active=i;
				subMenu[i].children[0].firstElementChild.disabled=false;
				subMenu[i].children[2].firstElementChild.disabled=false;
				curItem=subMenu[i].children[0].firstElementChild.value;
			}
		}
	}
}

function calculateChange(th)
{
	curItem=th.firstElementChild.value;
	subMenu[active].children[1].firstElementChild.value=item[active-1][curItem];
	if(subMenu[active].children[2].firstElementChild.value!="" && subMenu[active].children[2].firstElementChild.value!="0")
	{
		subMenu[active].children[2].firstElementChild.value=order[active-1][curItem];
	}
	if(subMenu[active].children[3].firstElementChild.value=="")
	{
		subMenu[active].children[3].firstElementChild.value=0;
	}
}
function calculate(th) 
{
	let qty=subMenu[active].children[2].firstElementChild.value;
	let total=0;
	if(subMenu[active].children[0].firstElementChild.value!="Select Item")
	{0
		order[active-1][curItem]=th.value;
	}
	for(let i in order[active-1])
	{	if(!isNaN(order[active-1][i]))
		{
				total += (Number(order[active-1][i])*Number(item[active-1][i]));
		}
	}
	subMenu[active].children[3].firstElementChild.value=total;
	netAmount();
	tax();
}

function netAmount() 
{
	let netAmt=0;
	for(let i=1;i<subMenu.length;i++)
	{	
		let temp=Number(subMenu[i].children[3].firstElementChild.value);
		netAmt += isNaN(temp)?0:temp;
	}

	document.getElementById('netAmount').value=netAmt;
}

function tax()
{
	document.getElementById('tax').value=Number(document.getElementById('netAmount').value)*0.1
}

function totalAmount() {
	let bill=document.getElementById('printBill');
	bill.innerHTML="";
	bill.innerHTML='<div class="row"><div class="col-3 text-center"><h6>Item</h6></div><div class="col-3 text-center"><h6>Quantity</h6></div><div class="col-3 text-center"><h6>Tax</h6></div><div class="col-3 text-center"><h6>Amount</h6></div></div>';
	for(let i=1;i<subMenu.length;i++)
	{
		for(let j in order[i-1])
		{
			if(order[i-1][j]!=0 && order[i-1][j]!=' - ')
			{
				bill.innerHTML=bill.innerHTML+'<div class="row"><div class="col-3 text-center"><p style="overflow-wrap:anywhere;">'+j.toUpperCase()+'</p></div><div class="col-3 text-center"><p>'+order[i-1][j]+'</p></div><div class="col-3 text-center"><p>'+(Number(order[i-1][j])*Number(item[i-1][j])*0.1)+'</p></div><div class="col-3 text-center"><p>'+Number(order[i-1][j])*Number(item[i-1][j])+'</p></div></div>';
			}
		}
	}
	let netAmt=0;
	for(let i=1;i<subMenu.length;i++)
	{	

		let temp=Number(subMenu[i].children[3].firstElementChild.value);
		netAmt += isNaN(temp)?0:temp;
	}
	let tax = netAmt*0.1;
	let total=netAmt+tax;
	bill.innerHTML=bill.innerHTML+'<hr class="my-2"/><div class="row"><div class="col-8 text-center"><h5>Total Payable : </h5></div><div class="col-4 text-center">'+total+'</div></div>'
}

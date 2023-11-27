"use strict";(self.webpackChunkcarvanna=self.webpackChunkcarvanna||[]).push([[514],{2514:(e,a,s)=>{s.r(a),s.d(a,{default:()=>F});var t=s(2791),c=s(9434);const l=e=>{let a=0,s=parseFloat(e);return s&&0!==s?(s<99.99?a+=1:s<199.99?a+=25:s<299.99?a+=60:s<349.99?a+=80:s<399.99?a+=90:s<449.99?a+=120:s<499.99?a+=130:s<549.99?a+=140:s<599.99?a+=150:s<699.99?a+=165:s<799.99?a+=185:s<899.99?a+=200:s<999.99?a+=215:s<1199.99?a+=230:s<1299.99?a+=255:s<1399.99?a+=275:s<1499.99?a+=280:s<1599.99?a+=290:s<1699.99?a+=305:s<1799.99?a+=315:s<1999.99?a+=325:s<2399.99?a+=355:s<2499.99?a+=380:s<2999.99?a+=400:s<3499.99?a+=450:s<3999.99?a+=500:s<4499.99?a+=600:s<4999.99?a+=625:s<5999.99?a+=650:s<6499.99||s<6999.99?a+=675:s<7499.99||s<7999.99?a+=700:s<8499.99?a+=725:s<8999.99?a=725:s<9999.99?a+=725:s<10499.99||s<10999.99||s<11499.99?a+=750:s<11999.99?a+=760:s<12499.99?a+=775:s<14999.99?a+=790:s>14999.99&&(a+=.06*s),s<499.99?a+=49:s<999.99?a+=59:s<1499.99?a+=79:s<1999.99?a+=89:s<3999.99?a+=99:s<5999.99?a+=109:s<7999.99?a+=139:s>7999.99&&(a+=149),a+=10,a+=20,a+=79,a):0},n=e=>{let a=0,s=parseFloat(e);return s&&0!==s?(s<99.99?a+=1:s<199.99?a+=25:s<299.99?a+=60:s<349.99?a+=80:s<399.99?a+=90:s<449.99?a+=120:s<499.99?a+=130:s<549.99?a+=140:s<599.99?a+=150:s<699.99?a+=165:s<799.99?a+=185:s<899.99?a+=200:s<999.99?a+=215:s<1199.99?a+=230:s<1299.99?a+=255:s<1399.99?a+=275:s<1499.99?a+=280:s<1599.99?a+=290:s<1699.99?a+=305:s<1799.99?a+=315:s<1999.99?a+=325:s<2399.99?a+=355:s<2499.99?a+=380:s<2999.99?a+=400:s<3499.99?a+=450:s<3999.99?a+=500:s<4499.99?a+=600:s<4999.99?a+=625:s<5999.99?a+=650:s<6499.99||s<6999.99?a+=675:s<7499.99||s<7999.99?a+=700:s<8499.99?a+=725:s<8999.99?a=725:s<9999.99?a+=725:s<10499.99||s<10999.99||s<11499.99?a+=750:s<11999.99?a+=760:s<12499.99?a+=775:s<14999.99?a+=790:s>14999.99&&(a+=.06*s),s<499.99?a+=49:s<999.99?a+=59:s<1499.99?a+=79:s<1999.99?a+=89:s<3999.99?a+=99:s<5999.99?a+=109:s<7999.99?a+=139:s>7999.99&&(a+=149),a+=10,a+=35,a+=79,a):0},i=e=>({type:"SET_CAR_COST",payload:e}),o=e=>({type:"SET_AUCTION_FEE",payload:e}),r=e=>({type:"SET_TOTAL_AUCTION_COST",payload:e}),d=e=>({type:"SET_STATES",payload:e}),u=e=>({type:"SET_SELECTED_STATE",payload:e}),p=e=>({type:"SET_LOCATION_NAMES",payload:e}),v=e=>({type:"SET_SELECTED_LOCATION",payload:e}),h=e=>({type:"SET_LOCATION_PRICE",payload:e}),m=e=>({type:"SET_CALC_DATA_SET",payload:e}),x=e=>({type:"SET_ERROR",payload:e}),j=e=>({type:"SET_LOADING",payload:e}),N=e=>({type:"SET_SELECTED_AUCTION",payload:e}),C=e=>({type:"SET_MODEL_YEAR",payload:e}),y=e=>({type:"SET_ENGINE_TYPE",payload:e}),E=e=>({type:"SET_ENGINE_SIZE",payload:e}),T=e=>({type:"SET_IMPORT_COST",payload:e}),g=e=>({type:"SET_COMPANIES_LIST",payload:e}),S=e=>({type:"SET_FILTER_VALUE",payload:e}),f=e=>({type:"SET_TRANSPORTATION_COST_LIST",payload:e});var A=s(184);function _(){const e=(0,c.I0)(),a=(0,c.v9)((e=>e.calcData.selectedAuction)),s=(0,c.v9)((e=>e.calcData.auctionFee)),d=(0,c.v9)((e=>e.calcData.totalAuctionCost)),p=(0,c.v9)((e=>e.calcData.carCost)),h=(0,t.useCallback)(((a,s)=>{let t=0;switch(s){case"Copart":t=l(a);break;case"IAAI":t=n(a);break;default:t=0}return e(i(a)),e(o(t)),e(r(parseFloat(a)+t)),t}),[e]);t.useEffect((()=>{a&&h(p,a)}),[a,p,h]);return(0,A.jsxs)("div",{className:"calc-section calc-section-auction",children:[(0,A.jsx)("div",{className:"auction-header",children:(0,A.jsx)("h2",{children:"Auction Cost Section:"})}),(0,A.jsxs)("div",{className:"auction-section",children:[(0,A.jsx)("label",{htmlFor:"auction",children:"Auction:"}),(0,A.jsxs)("select",{id:"auction",value:a,onChange:a=>{const s=a.target.value;h(p,s),e(N(s)),e(u("")),e(v("")),e(o(0)),e(r(0))},children:[(0,A.jsx)("option",{value:"",children:"Select Auction"}),(0,A.jsx)("option",{value:"Copart",children:"Copart"}),(0,A.jsx)("option",{value:"IAAI",children:"IAAI"})]})]}),(0,A.jsxs)("div",{className:"car-section",children:[(0,A.jsx)("label",{htmlFor:"carCost",children:"Car Cost:"}),(0,A.jsx)("input",{type:"text",id:"carCost",value:p,onChange:e=>h(e.target.value)})]}),(0,A.jsxs)("div",{className:"total-fee-cost",children:[(0,A.jsx)("div",{className:"fee-label",children:"Auction Fee:"}),(0,A.jsx)("div",{className:"fee-cost",children:"$".concat(s)})]}),(0,A.jsxs)("div",{className:"total-cost",children:[(0,A.jsx)("div",{className:"cost-label",children:"Total Auction Cost:"}),(0,A.jsx)("div",{className:"cost",children:d?"$".concat(d):"$0"})]})]})}function I(){const e=(0,c.I0)(),a=(0,c.v9)((e=>e.calcData.data)),s=(0,c.v9)((e=>e.calcData.selectedAuction)),l=(0,c.v9)((e=>e.calcData.selectedCompany)),n=(0,c.v9)((e=>e.calcData.stateNames)),i=(0,c.v9)((e=>e.calcData.selectedState)),m=(0,c.v9)((e=>e.calcData.locationNames)),x=(0,c.v9)((e=>e.calcData.selectedLocation)),j=(0,c.v9)((e=>e.calcData.locationPrice));t.useEffect((()=>{if(!a)return;const t=a.data.companies.find((e=>"Estimated Prices"===e.name)),c=(t?t.auctions:[]).find((e=>e.name===s)),l=c?c.states.map((e=>e.name)):[],n=c?c.states.find((e=>e.name===i)):null,o=n?n.locations.map((e=>e.name)):[],r=n?n.locations.find((e=>e.name===x)):null,u=r?r.price:null;e(d(l)),e(p(o)),e(h(u))}),[a,l,s,i,x,e]);return(0,A.jsxs)("div",{className:"calc-section calc-section-transportation",children:[(0,A.jsx)("div",{className:"transposration-header",children:(0,A.jsx)("h2",{children:"Transportation Cost Section:"})}),(0,A.jsxs)("div",{className:"auction-section",children:[(0,A.jsx)("label",{children:"Auction:"}),(0,A.jsxs)("select",{value:s,onChange:a=>(a=>{const s=a.target.value;e(N(s)),e(u("")),e(v("")),e(o(0)),e(r(0))})(a),children:[(0,A.jsx)("option",{value:"",children:"Select Auction"}),(0,A.jsx)("option",{value:"Copart",children:"Copart"}),(0,A.jsx)("option",{value:"IAAI",children:"IAAI"})]})]}),(0,A.jsxs)("div",{className:"state-section",children:[(0,A.jsx)("label",{children:"State:"}),(0,A.jsxs)("select",{value:i,onChange:a=>(a=>{const s=a.target.value;e(u(s)),e(v(""))})(a),children:[(0,A.jsx)("option",{value:"",children:"Select State"}),n?n.map((e=>(0,A.jsx)("option",{value:e,children:e},e))):null]})]}),(0,A.jsxs)("div",{className:"location-section",children:[(0,A.jsx)("label",{children:"Location:"}),(0,A.jsxs)("select",{value:x,onChange:a=>(a=>{const s=a.target.value;e(v(s))})(a),children:[(0,A.jsx)("option",{value:"",children:"Select Location"}),m?m.map((e=>(0,A.jsx)("option",{value:e,children:e},e))):null]})]}),(0,A.jsxs)("div",{className:"transportation-price",children:[(0,A.jsx)("div",{className:"cost-label",children:"Transportation Cost:"}),(0,A.jsx)("div",{className:"cost",children:j?"$".concat(j):"$0"})]})]})}const D=()=>{const e=[];for(let a=(new Date).getFullYear();a>=1984;a--)e.push(a);return e.push("1983 or older"),e},b=(e,a,s,t)=>{if("Pick a Model Year"===e||"Pick an Engine Type"===a||!s||!t)return 0;if("0"===s||""===s)return 0;if("."===s[1]||","===s[1]||","===s[2]||"."===s[2]){let e="",a="";const t=s.indexOf("."),c=s.indexOf(",");e=c>-1?s.slice(0,c):s.slice(0,t),a=c>-1?s.slice(c+1):s.slice(t+1);const l=parseInt(e),n=parseInt(a);s=1e3*l,s+=a?100*n:0}const c=parseInt(s),l=(new Date).getFullYear()-e;let n=0;return"Gas"!==a&&"Diesel"!==a||(n=l<=2?1.5*c:l<=3?1.4*c:l<=4?1.2*c:l<=5?1*c:l<=8?.8*c:l<=9?.9*c:l<=10?1.1*c:l<=11?1.3*c:l<=12?1.5*c:l<=13?1.8*c:l<=14?2.1*c:l>14&&l<=40?2.4*c:1*c,n+=150,n+=200,n+=.058*c,n+=30,n+=50,n+=50),"Electric"===a&&(n+=150,n+=200,n+=30,n+=50,n+=50),"Hybrid"===a&&(n=l<=2?.6*c:l<=3?.56*c:l<=4?.48*c:l<=5?.4*c:l<=6?.32*c:l<=8?.8*c:l<=9?.9*c:l<=10?1.1*c:l<=11?1.3*c:l<=12?1.5*c:l<=13?1.8*c:l<=14?2.1*c:l>14&&l<=40?2.4*c:1*c,n+=150,n+=200,n+=.058*c,n+=30,n+=50,n+=50),Math.round(n/t*10)/10};function O(){const e=(0,c.I0)(),a=(0,c.v9)((e=>e.calcData.modelYear)),s=(0,c.v9)((e=>e.calcData.engineType)),t=(0,c.v9)((e=>e.calcData.engineSize)),l=(0,c.v9)((e=>e.calcData.importCost)),n=(0,c.v9)((e=>e.calcData.usdToGelExchangeRate));return(0,A.jsxs)("div",{className:"calc-section calc-section-import",children:[(0,A.jsx)("div",{className:"transposration-header",children:(0,A.jsx)("h2",{children:"Import Cost Section:"})}),(0,A.jsxs)("div",{className:"model-year-section",children:[(0,A.jsx)("label",{children:"Model Year:"}),(0,A.jsxs)("select",{value:a,onChange:a=>(a=>{const c=a.target.value,l=b(c,s,t,n);e(C(c)),e(T(l))})(a),children:[(0,A.jsx)("option",{value:"Pick a Model Year",children:"Pick a Model Year"}),D?D().map((e=>(0,A.jsx)("option",{value:e,children:e},e))):null]})]}),(0,A.jsxs)("div",{className:"engine-type",children:[(0,A.jsx)("label",{children:"Engine Type:"}),(0,A.jsxs)("select",{value:s,onChange:a=>(a=>{const s=a.target.value,c=b(s,s,t,n);e(y(s)),e(T(c))})(a),children:[(0,A.jsx)("option",{value:"Pick an Engine Type",children:"Pick an Engine Type"}),(0,A.jsx)("option",{value:"Gas",children:"Gas"}),(0,A.jsx)("option",{value:"Diesel",children:"Diesel"}),(0,A.jsx)("option",{value:"Electric",children:"Electric"}),(0,A.jsx)("option",{value:"Hybrid",children:"Hybrid"})]})]}),(0,A.jsxs)("div",{className:"engine-size-section",children:[(0,A.jsx)("label",{children:"Engine Size:"}),(0,A.jsx)("input",{type:"text",value:t,onChange:t=>(t=>{const c=t.target.value,l=b(a,s,c,n);e(E(c)),e(T(l))})(t)})]}),(0,A.jsxs)("div",{className:"import-cost",children:[(0,A.jsx)("div",{className:"cost-label",children:"Import Cost:"}),(0,A.jsx)("div",{className:"cost",children:"$".concat(l)})]})]})}function L(){return(0,A.jsx)("div",{className:"calc-header",children:(0,A.jsx)("h1",{children:"Bidder Cost Calculator"})})}const k=e=>{let{rating:a}=e;const s=Math.floor(a),t=5-s,c=a-s;return(0,A.jsx)("div",{className:"rating-stars",children:(()=>{const e=[];for(let a=0;a<s;a++)e.push((0,A.jsx)("span",{className:"star filled",children:"\u2605"},a));c>=.25?e.push((0,A.jsx)("span",{className:"star quarter",children:"\u2606\u2605"},"quarter")):c>=.75&&e.push((0,A.jsx)("span",{className:"star three-quarters",children:"\u2605\u2606"},"three-quarters"));for(let a=0;a<t-(c>=.75?1:0);a++)e.push((0,A.jsx)("span",{className:"star",children:"\u2606"},a+s));return e})()})};function P(){const e=(0,c.I0)(),a=(0,c.v9)((e=>e.calcData.data)),s=(0,c.v9)((e=>e.calcData.companiesList)),l=(0,c.v9)((e=>e.calcData.totalAuctionCost)),n=(0,c.v9)((e=>e.calcData.importCost)),i=(0,c.v9)((e=>e.calcData.selectedAuction)),o=(0,c.v9)((e=>e.calcData.selectedState)),r=(0,c.v9)((e=>e.calcData.selectedLocation)),d=(0,c.v9)((e=>e.calcData.filterValue)),u=(0,c.v9)((e=>e.calcData.transportationCostList)),p=(0,t.useCallback)((function(e,a){const s="desc"===(arguments.length>2&&void 0!==arguments[2]?arguments[2]:"asc")?-1:1;return e.slice().sort(((e,t)=>((e[a]||0)-(t[a]||0))*s))}),[]),v=(0,t.useMemo)((()=>{const e=p(JSON.parse(JSON.stringify(s)),d.property,d.order),a=e.findIndex((e=>"Estimated Prices"===e.name));return a>-1&&e.splice(a,1),e}),[s,p,d.order,d.property]),h=(0,t.useCallback)((a=>{let s=0;if(i&&o&&r){const e=a?a.auctions:[],t=null===e||void 0===e?void 0:e.find((e=>e.name===i)),c=null===t||void 0===t?void 0:t.states,l=null===c||void 0===c?void 0:c.find((e=>e.name===o)),n=null===l||void 0===l?void 0:l.locations,d=null===n||void 0===n?void 0:n.find((e=>e.name===r));s+=(null===d||void 0===d?void 0:d.price)||0}return e(f({name:a.name,value:s})),s}),[i,o,r,e]);(0,t.useEffect)((()=>{if(!a)return;const s=a.data.companies;for(let e=0;e<s.length;e++)h(s[e]);e(g(s))}),[a,r,e,h]);const m=(0,t.useCallback)((function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const a=(l||0)+(n||0)+(u[e.name]||0);return e.totalCost=a,a}),[l,n,u]),x=(0,t.useCallback)((a=>{const s=a.target.value,t=s.split(" ")[0],c=s.split(" ")[1],l=p(v,t,c);e(S({property:t,order:s.split(" ")[1]})),e(g(l))}),[v,e,p]),j=(0,t.useMemo)((()=>v.map((e=>(0,A.jsxs)("div",{className:"company-item",children:[(0,A.jsx)("div",{className:"company-name",children:e.name}),(0,A.jsx)("div",{className:"company-logo",children:(0,A.jsx)("img",{src:"https://png.pngtree.com/png-vector/20190225/ourmid/pngtree-circuit-logo-template-vector-png-image_704226.jpg",alt:e.name})}),(0,A.jsx)("div",{className:"cost-indicator",children:(0,A.jsx)("div",{className:"sub-value",children:l?"$".concat(l):"$0"})}),(0,A.jsx)("div",{className:"cost-indicator",children:(0,A.jsx)("div",{className:"sub-value",children:u[e.name]?"$".concat(u[e.name]):"$0"})}),(0,A.jsx)("div",{className:"cost-indicator",children:(0,A.jsx)("div",{className:"sub-value",children:n?"$".concat(n):"$0"})}),(0,A.jsx)("div",{className:"cost-indicator",children:(0,A.jsx)("div",{className:"sub-value",children:m(e)?"$".concat(m(e)):"$0"})}),(0,A.jsx)("div",{className:"company-rating",children:(0,A.jsx)(k,{rating:e.rating})}),(0,A.jsx)("div",{className:"view-more",children:(0,A.jsx)("button",{children:"View More"})})]},e.name)))),[v,l,u,n,m]);return(0,A.jsxs)("div",{className:"footer-content",children:[(0,A.jsxs)("div",{className:"company-labels",children:[(0,A.jsx)("div",{className:"name",children:"Company Name :"}),(0,A.jsx)("div",{className:"auction-cost",children:"Auction Cost :"}),(0,A.jsx)("div",{className:"transportation-cost",children:"Transporation Cost :"}),(0,A.jsx)("div",{className:"import-cost",children:"Import Cost :"}),(0,A.jsx)("div",{className:"total",children:"Total :"}),(0,A.jsx)("div",{className:"rating",children:"Rating :"}),(0,A.jsxs)("div",{className:"filter",children:[(0,A.jsx)("label",{children:"Filter By:"}),(0,A.jsxs)("select",{value:d.property+" "+d.order,onChange:e=>x(e),children:[(0,A.jsx)("option",{value:"rating asc",children:"Rating asc"}),(0,A.jsx)("option",{value:"rating desc",children:"Rating desc"}),(0,A.jsx)("option",{value:"totalCost asc",children:"Total Cost asc"}),(0,A.jsx)("option",{value:"totalCost desc",children:"Total Cost desc"})]})]})]}),j]})}var R=s(4569),$=s.n(R);const M=()=>$().get("/apis/dummy_data.json",{params:{}}).then((e=>e.data));function F(){const e=(0,c.I0)(),[a,s]=(0,t.useState)("");return t.useEffect((()=>{(async()=>{try{e(j(!0)),e(x(null));const a=await M();e(m(a)),e(j(!1))}catch(a){e(x(a)),e(j(!1))}})()}),[e]),(0,A.jsxs)("div",{className:"page-content",children:[(0,A.jsx)(L,{}),(0,A.jsxs)("div",{className:"calc",children:[(0,A.jsx)(_,{selectedAuction:a,setSelectedAuction:s}),(0,A.jsx)(I,{selectedAuction:a,setSelectedAuction:s}),(0,A.jsx)(O,{})]}),(0,A.jsx)(P,{})]})}}}]);
//# sourceMappingURL=514.473dffc5.chunk.js.map
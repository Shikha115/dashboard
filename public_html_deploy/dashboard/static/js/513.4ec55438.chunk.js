"use strict";(self.webpackChunkdashboard=self.webpackChunkdashboard||[]).push([[513],{3513:(e,t,n)=>{var o=n(2791),l=n(6444);function a(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r,i=function(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(n){if("default"!==n){var o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,o.get?o:{enumerable:!0,get:function(){return e[n]}})}})),t.default=e,Object.freeze(t)}(o),s=a(o),d=a(l);function c(e,t){return e[t]}function u(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return[...e.slice(0,n),t,...e.slice(n)]}function g(){let e=arguments.length>1?arguments[1]:void 0,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"id";const n=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).slice(),o=c(e,t);return o?n.splice(n.findIndex((e=>c(e,t)===o)),1):n.splice(n.findIndex((t=>t===e)),1),n}function p(e){return e.map(((e,t)=>{const n=Object.assign(Object.assign({},e),{sortable:e.sortable||!!e.sortFunction||void 0});return e.id||(n.id=t+1),n}))}function b(e,t){return Math.ceil(e/t)}function h(e,t){return Math.min(e,t)}!function(e){e.ASC="asc",e.DESC="desc"}(r||(r={}));const f=()=>null;function m(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n={},o=[...arguments.length>2&&void 0!==arguments[2]?arguments[2]:[]];return t.length&&t.forEach((t=>{if(!t.when||"function"!=typeof t.when)throw new Error('"when" must be defined in the conditional style object and must be function');t.when(e)&&(n=t.style||{},t.classNames&&(o=[...o,...t.classNames]),"function"==typeof t.style&&(n=t.style(e)||{}))})),{conditionalStyle:n,classNames:o.join(" ")}}function w(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"id";const o=c(e,n);return o?t.some((e=>c(e,n)===o)):t.some((t=>t===e))}function x(e,t){return t?e.findIndex((e=>C(e.id,t))):-1}function C(e,t){return e==t}function v(e,t){const n=!e.toggleOnSelectedRowsChange;switch(t.type){case"SELECT_ALL_ROWS":{const{keyField:n,rows:o,rowCount:l,mergeSelections:a}=t,r=!e.allSelected,i=!e.toggleOnSelectedRowsChange;if(a){const t=r?[...e.selectedRows,...o.filter((t=>!w(t,e.selectedRows,n)))]:e.selectedRows.filter((e=>!w(e,o,n)));return Object.assign(Object.assign({},e),{allSelected:r,selectedCount:t.length,selectedRows:t,toggleOnSelectedRowsChange:i})}return Object.assign(Object.assign({},e),{allSelected:r,selectedCount:r?l:0,selectedRows:r?o:[],toggleOnSelectedRowsChange:i})}case"SELECT_SINGLE_ROW":{const{keyField:o,row:l,isSelected:a,rowCount:r,singleSelect:i}=t;return i?a?Object.assign(Object.assign({},e),{selectedCount:0,allSelected:!1,selectedRows:[],toggleOnSelectedRowsChange:n}):Object.assign(Object.assign({},e),{selectedCount:1,allSelected:!1,selectedRows:[l],toggleOnSelectedRowsChange:n}):a?Object.assign(Object.assign({},e),{selectedCount:e.selectedRows.length>0?e.selectedRows.length-1:0,allSelected:!1,selectedRows:g(e.selectedRows,l,o),toggleOnSelectedRowsChange:n}):Object.assign(Object.assign({},e),{selectedCount:e.selectedRows.length+1,allSelected:e.selectedRows.length+1===r,selectedRows:u(e.selectedRows,l),toggleOnSelectedRowsChange:n})}case"SELECT_MULTIPLE_ROWS":{const{keyField:o,selectedRows:l,totalRows:a,mergeSelections:r}=t;if(r){const t=[...e.selectedRows,...l.filter((t=>!w(t,e.selectedRows,o)))];return Object.assign(Object.assign({},e),{selectedCount:t.length,allSelected:!1,selectedRows:t,toggleOnSelectedRowsChange:n})}return Object.assign(Object.assign({},e),{selectedCount:l.length,allSelected:l.length===a,selectedRows:l,toggleOnSelectedRowsChange:n})}case"CLEAR_SELECTED_ROWS":{const{selectedRowsFlag:n}=t;return Object.assign(Object.assign({},e),{allSelected:!1,selectedCount:0,selectedRows:[],selectedRowsFlag:n})}case"SORT_CHANGE":{const{sortDirection:o,selectedColumn:l,clearSelectedOnSort:a}=t;return Object.assign(Object.assign(Object.assign({},e),{selectedColumn:l,sortDirection:o,currentPage:1}),a&&{allSelected:!1,selectedCount:0,selectedRows:[],toggleOnSelectedRowsChange:n})}case"CHANGE_PAGE":{const{page:o,paginationServer:l,visibleOnly:a,persistSelectedOnPageChange:r}=t,i=l&&r,s=l&&!r||a;return Object.assign(Object.assign(Object.assign(Object.assign({},e),{currentPage:o}),i&&{allSelected:!1}),s&&{allSelected:!1,selectedCount:0,selectedRows:[],toggleOnSelectedRowsChange:n})}case"CHANGE_ROWS_PER_PAGE":{const{rowsPerPage:n,page:o}=t;return Object.assign(Object.assign({},e),{currentPage:o,rowsPerPage:n})}}}const y=l.css`
	pointer-events: none;
	opacity: 0.4;
`,R=d.default.div`
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	max-width: 100%;
	${e=>{let{disabled:t}=e;return t&&y}};
	${e=>{let{theme:t}=e;return t.table.style}};
`,S=l.css`
	position: sticky;
	position: -webkit-sticky; /* Safari */
	top: 0;
	z-index: 1;
`,E=d.default.div`
	display: flex;
	width: 100%;
	${e=>{let{$fixedHeader:t}=e;return t&&S}};
	${e=>{let{theme:t}=e;return t.head.style}};
`,O=d.default.div`
	display: flex;
	align-items: stretch;
	width: 100%;
	${e=>{let{theme:t}=e;return t.headRow.style}};
	${e=>{let{$dense:t,theme:n}=e;return t&&n.headRow.denseStyle}};
`,$=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return l.css`
		@media screen and (max-width: ${599}px) {
			${l.css(e,...n)}
		}
	`},k=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return l.css`
		@media screen and (max-width: ${959}px) {
			${l.css(e,...n)}
		}
	`},P=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return l.css`
		@media screen and (max-width: ${1280}px) {
			${l.css(e,...n)}
		}
	`},D=d.default.div`
	position: relative;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	line-height: normal;
	${e=>{let{theme:t,$headCell:n}=e;return t[n?"headCells":"cells"].style}};
	${e=>{let{$noPadding:t}=e;return t&&"padding: 0"}};
`,H=d.default(D)`
	flex-grow: ${e=>{let{button:t,grow:n}=e;return 0===n||t?0:n||1}};
	flex-shrink: 0;
	flex-basis: 0;
	max-width: ${e=>{let{maxWidth:t}=e;return t||"100%"}};
	min-width: ${e=>{let{minWidth:t}=e;return t||"100px"}};
	${e=>{let{width:t}=e;return t&&l.css`
			min-width: ${t};
			max-width: ${t};
		`}};
	${e=>{let{right:t}=e;return t&&"justify-content: flex-end"}};
	${e=>{let{button:t,center:n}=e;return(n||t)&&"justify-content: center"}};
	${e=>{let{compact:t,button:n}=e;return(t||n)&&"padding: 0"}};

	/* handle hiding cells */
	${e=>{let{hide:t}=e;return t&&"sm"===t&&$`
    display: none;
  `}};
	${e=>{let{hide:t}=e;return t&&"md"===t&&k`
    display: none;
  `}};
	${e=>{let{hide:t}=e;return t&&"lg"===t&&P`
    display: none;
  `}};
	${e=>{let{hide:t}=e;return t&&Number.isInteger(t)&&(e=>function(t){for(var n=arguments.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];return l.css`
			@media screen and (max-width: ${e}px) {
				${l.css(t,...o)}
			}
		`})(t)`
    display: none;
  `}};
`,j=l.css`
	div:first-child {
		white-space: ${e=>{let{$wrapCell:t}=e;return t?"normal":"nowrap"}};
		overflow: ${e=>{let{$allowOverflow:t}=e;return t?"visible":"hidden"}};
		text-overflow: ellipsis;
	}
`,F=d.default(H).attrs((e=>({style:e.style})))`
	${e=>{let{$renderAsCell:t}=e;return!t&&j}};
	${e=>{let{theme:t,$isDragging:n}=e;return n&&t.cells.draggingStyle}};
	${e=>{let{$cellStyle:t}=e;return t}};
`;var I=i.memo((function(e){let{id:t,column:n,row:o,rowIndex:l,dataTag:a,isDragging:r,onDragStart:s,onDragOver:d,onDragEnd:c,onDragEnter:u,onDragLeave:g}=e;const{conditionalStyle:p,classNames:b}=m(o,n.conditionalCellStyles,["rdt_TableCell"]);return i.createElement(F,{id:t,"data-column-id":n.id,role:"cell",className:b,"data-tag":a,$cellStyle:n.style,$renderAsCell:!!n.cell,$allowOverflow:n.allowOverflow,button:n.button,center:n.center,compact:n.compact,grow:n.grow,hide:n.hide,maxWidth:n.maxWidth,minWidth:n.minWidth,right:n.right,width:n.width,$wrapCell:n.wrap,style:p,$isDragging:r,onDragStart:s,onDragOver:d,onDragEnd:c,onDragEnter:u,onDragLeave:g},!n.cell&&i.createElement("div",{"data-tag":a},function(e,t,n,o){return t?n&&"function"==typeof n?n(e,o):t(e,o):null}(o,n.selector,n.format,l)),n.cell&&n.cell(o,l,n,t))}));const T="input";var A=i.memo((function(e){let{name:t,component:n=T,componentOptions:o={style:{}},indeterminate:l=!1,checked:a=!1,disabled:r=!1,onClick:s=f}=e;const d=n,c=d!==T?o.style:(e=>Object.assign(Object.assign({fontSize:"18px"},!e&&{cursor:"pointer"}),{padding:0,marginTop:"1px",verticalAlign:"middle",position:"relative"}))(r),u=i.useMemo((()=>function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];let l;return Object.keys(e).map((t=>e[t])).forEach(((t,o)=>{const a=e;"function"==typeof t&&(l=Object.assign(Object.assign({},a),{[Object.keys(e)[o]]:t(...n)}))})),l||e}(o,l)),[o,l]);return i.createElement(d,Object.assign({type:"checkbox",ref:e=>{e&&(e.indeterminate=l)},style:c,onClick:r?f:s,name:t,"aria-label":t,checked:a,disabled:r},u,{onChange:f}))}));const M=d.default(D)`
	flex: 0 0 48px;
	min-width: 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
`;function L(e){let{name:t,keyField:n,row:o,rowCount:l,selected:a,selectableRowsComponent:r,selectableRowsComponentProps:s,selectableRowsSingle:d,selectableRowDisabled:c,onSelectedRow:u}=e;const g=!(!c||!c(o));return i.createElement(M,{onClick:e=>e.stopPropagation(),className:"rdt_TableCell",$noPadding:!0},i.createElement(A,{name:t,component:r,componentOptions:s,checked:a,"aria-checked":a,onClick:()=>{u({type:"SELECT_SINGLE_ROW",row:o,isSelected:a,keyField:n,rowCount:l,singleSelect:d})},disabled:g}))}const _=d.default.button`
	display: inline-flex;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	border: none;
	background-color: transparent;
	${e=>{let{theme:t}=e;return t.expanderButton.style}};
`;function N(e){let{disabled:t=!1,expanded:n=!1,expandableIcon:o,id:l,row:a,onToggled:r}=e;const s=n?o.expanded:o.collapsed;return i.createElement(_,{"aria-disabled":t,onClick:()=>r&&r(a),"data-testid":`expander-button-${l}`,disabled:t,"aria-label":n?"Collapse Row":"Expand Row",role:"button",type:"button"},s)}const z=d.default(D)`
	white-space: nowrap;
	font-weight: 400;
	min-width: 48px;
	${e=>{let{theme:t}=e;return t.expanderCell.style}};
`;function W(e){let{row:t,expanded:n=!1,expandableIcon:o,id:l,onToggled:a,disabled:r=!1}=e;return i.createElement(z,{onClick:e=>e.stopPropagation(),$noPadding:!0},i.createElement(N,{id:l,row:t,expanded:n,expandableIcon:o,disabled:r,onToggled:a}))}const B=d.default.div`
	width: 100%;
	box-sizing: border-box;
	${e=>{let{theme:t}=e;return t.expanderRow.style}};
	${e=>{let{$extendedRowStyle:t}=e;return t}};
`;var G=i.memo((function(e){let{data:t,ExpanderComponent:n,expanderComponentProps:o,extendedRowStyle:l,extendedClassNames:a}=e;const r=["rdt_ExpanderRow",...a.split(" ").filter((e=>"rdt_TableRow"!==e))].join(" ");return i.createElement(B,{className:r,$extendedRowStyle:l},i.createElement(n,Object.assign({data:t},o)))}));const V="allowRowEvents";var U,Y,K;t.Nm=void 0,(U=t.Nm||(t.Nm={})).LTR="ltr",U.RTL="rtl",U.AUTO="auto",t.v2=void 0,(Y=t.v2||(t.v2={})).LEFT="left",Y.RIGHT="right",Y.CENTER="center",t.pU=void 0,(K=t.pU||(t.pU={})).SM="sm",K.MD="md",K.LG="lg";const Z=l.css`
	&:hover {
		${e=>{let{$highlightOnHover:t,theme:n}=e;return t&&n.rows.highlightOnHoverStyle}};
	}
`,q=l.css`
	&:hover {
		cursor: pointer;
	}
`,J=d.default.div.attrs((e=>({style:e.style})))`
	display: flex;
	align-items: stretch;
	align-content: stretch;
	width: 100%;
	box-sizing: border-box;
	${e=>{let{theme:t}=e;return t.rows.style}};
	${e=>{let{$dense:t,theme:n}=e;return t&&n.rows.denseStyle}};
	${e=>{let{$striped:t,theme:n}=e;return t&&n.rows.stripedStyle}};
	${e=>{let{$highlightOnHover:t}=e;return t&&Z}};
	${e=>{let{$pointerOnHover:t}=e;return t&&q}};
	${e=>{let{$selected:t,theme:n}=e;return t&&n.rows.selectedHighlightStyle}};
	${e=>{let{$conditionalStyle:t}=e;return t}};
`;function Q(e){let{columns:t=[],conditionalRowStyles:n=[],defaultExpanded:o=!1,defaultExpanderDisabled:l=!1,dense:a=!1,expandableIcon:r,expandableRows:s=!1,expandableRowsComponent:d,expandableRowsComponentProps:u,expandableRowsHideExpander:g,expandOnRowClicked:p=!1,expandOnRowDoubleClicked:b=!1,highlightOnHover:h=!1,id:w,expandableInheritConditionalStyles:x,keyField:v,onRowClicked:y=f,onRowDoubleClicked:R=f,onRowMouseEnter:S=f,onRowMouseLeave:E=f,onRowExpandToggled:O=f,onSelectedRow:$=f,pointerOnHover:k=!1,row:P,rowCount:D,rowIndex:H,selectableRowDisabled:j=null,selectableRows:F=!1,selectableRowsComponent:T,selectableRowsComponentProps:A,selectableRowsHighlight:M=!1,selectableRowsSingle:_=!1,selected:N,striped:z=!1,draggingColumnId:B,onDragStart:U,onDragOver:Y,onDragEnd:K,onDragEnter:Z,onDragLeave:q}=e;const[Q,X]=i.useState(o);i.useEffect((()=>{X(o)}),[o]);const ee=i.useCallback((()=>{X(!Q),O(!Q,P)}),[Q,O,P]),te=k||s&&(p||b),ne=i.useCallback((e=>{e.target.getAttribute("data-tag")===V&&(y(P,e),!l&&s&&p&&ee())}),[l,p,s,ee,y,P]),oe=i.useCallback((e=>{e.target.getAttribute("data-tag")===V&&(R(P,e),!l&&s&&b&&ee())}),[l,b,s,ee,R,P]),le=i.useCallback((e=>{S(P,e)}),[S,P]),ae=i.useCallback((e=>{E(P,e)}),[E,P]),re=c(P,v),{conditionalStyle:ie,classNames:se}=m(P,n,["rdt_TableRow"]),de=M&&N,ce=x?ie:{},ue=z&&H%2==0;return i.createElement(i.Fragment,null,i.createElement(J,{id:`row-${w}`,role:"row",$striped:ue,$highlightOnHover:h,$pointerOnHover:!l&&te,$dense:a,onClick:ne,onDoubleClick:oe,onMouseEnter:le,onMouseLeave:ae,className:se,$selected:de,$conditionalStyle:ie},F&&i.createElement(L,{name:`select-row-${re}`,keyField:v,row:P,rowCount:D,selected:N,selectableRowsComponent:T,selectableRowsComponentProps:A,selectableRowDisabled:j,selectableRowsSingle:_,onSelectedRow:$}),s&&!g&&i.createElement(W,{id:re,expandableIcon:r,expanded:Q,row:P,onToggled:ee,disabled:l}),t.map((e=>e.omit?null:i.createElement(I,{id:`cell-${e.id}-${re}`,key:`cell-${e.id}-${re}`,dataTag:e.ignoreRowClick||e.button?null:V,column:e,row:P,rowIndex:H,isDragging:C(B,e.id),onDragStart:U,onDragOver:Y,onDragEnd:K,onDragEnter:Z,onDragLeave:q})))),s&&Q&&i.createElement(G,{key:`expander-${re}`,data:P,extendedRowStyle:ce,extendedClassNames:se,ExpanderComponent:d,expanderComponentProps:u}))}const X=d.default.span`
	padding: 2px;
	color: inherit;
	flex-grow: 0;
	flex-shrink: 0;
	${e=>{let{$sortActive:t}=e;return t?"opacity: 1":"opacity: 0"}};
	${e=>{let{$sortDirection:t}=e;return"desc"===t&&"transform: rotate(180deg)"}};
`,ee=e=>{let{sortActive:t,sortDirection:n}=e;return s.default.createElement(X,{$sortActive:t,$sortDirection:n},"\u25b2")},te=d.default(H)`
	${e=>{let{button:t}=e;return t&&"text-align: center"}};
	${e=>{let{theme:t,$isDragging:n}=e;return n&&t.headCells.draggingStyle}};
`,ne=l.css`
	cursor: pointer;
	span.__rdt_custom_sort_icon__ {
		i,
		svg {
			transform: 'translate3d(0, 0, 0)';
			${e=>{let{$sortActive:t}=e;return t?"opacity: 1":"opacity: 0"}};
			color: inherit;
			font-size: 18px;
			height: 18px;
			width: 18px;
			backface-visibility: hidden;
			transform-style: preserve-3d;
			transition-duration: 95ms;
			transition-property: transform;
		}

		&.asc i,
		&.asc svg {
			transform: rotate(180deg);
		}
	}

	${e=>{let{$sortActive:t}=e;return!t&&l.css`
			&:hover,
			&:focus {
				opacity: 0.7;

				span,
				span.__rdt_custom_sort_icon__ * {
					opacity: 0.7;
				}
			}
		`}};
`,oe=d.default.div`
	display: inline-flex;
	align-items: center;
	justify-content: inherit;
	height: 100%;
	width: 100%;
	outline: none;
	user-select: none;
	overflow: hidden;
	${e=>{let{disabled:t}=e;return!t&&ne}};
`,le=d.default.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;var ae=i.memo((function(e){let{column:t,disabled:n,draggingColumnId:o,selectedColumn:l={},sortDirection:a,sortIcon:s,sortServer:d,pagination:c,paginationServer:u,persistSelectedOnSort:g,selectableRowsVisibleOnly:p,onSort:b,onDragStart:h,onDragOver:f,onDragEnd:m,onDragEnter:w,onDragLeave:x}=e;i.useEffect((()=>{"string"==typeof t.selector&&console.error(`Warning: ${t.selector} is a string based column selector which has been deprecated as of v7 and will be removed in v8. Instead, use a selector function e.g. row => row[field]...`)}),[]);const[v,y]=i.useState(!1),R=i.useRef(null);if(i.useEffect((()=>{R.current&&y(R.current.scrollWidth>R.current.clientWidth)}),[v]),t.omit)return null;const S=()=>{if(!t.sortable&&!t.selector)return;let e=a;C(l.id,t.id)&&(e=a===r.ASC?r.DESC:r.ASC),b({type:"SORT_CHANGE",sortDirection:e,selectedColumn:t,clearSelectedOnSort:c&&u&&!g||d||p})},E=e=>i.createElement(ee,{sortActive:e,sortDirection:a}),O=()=>i.createElement("span",{className:[a,"__rdt_custom_sort_icon__"].join(" ")},s),$=!(!t.sortable||!C(l.id,t.id)),k=!t.sortable||n,P=t.sortable&&!s&&!t.right,D=t.sortable&&!s&&t.right,H=t.sortable&&s&&!t.right,j=t.sortable&&s&&t.right;return i.createElement(te,{"data-column-id":t.id,className:"rdt_TableCol",$headCell:!0,allowOverflow:t.allowOverflow,button:t.button,compact:t.compact,grow:t.grow,hide:t.hide,maxWidth:t.maxWidth,minWidth:t.minWidth,right:t.right,center:t.center,width:t.width,draggable:t.reorder,$isDragging:C(t.id,o),onDragStart:h,onDragOver:f,onDragEnd:m,onDragEnter:w,onDragLeave:x},t.name&&i.createElement(oe,{"data-column-id":t.id,"data-sort-id":t.id,role:"columnheader",tabIndex:0,className:"rdt_TableCol_Sortable",onClick:k?void 0:S,onKeyPress:k?void 0:e=>{"Enter"===e.key&&S()},$sortActive:!k&&$,disabled:k},!k&&j&&O(),!k&&D&&E($),"string"==typeof t.name?i.createElement(le,{title:v?t.name:void 0,ref:R,"data-column-id":t.id},t.name):t.name,!k&&H&&O(),!k&&P&&E($)))}));const re=d.default(D)`
	flex: 0 0 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	font-size: unset;
`;function ie(e){let{headCell:t=!0,rowData:n,keyField:o,allSelected:l,mergeSelections:a,selectedRows:r,selectableRowsComponent:s,selectableRowsComponentProps:d,selectableRowDisabled:c,onSelectAllRows:u}=e;const g=r.length>0&&!l,p=c?n.filter((e=>!c(e))):n,b=0===p.length,h=Math.min(n.length,p.length);return i.createElement(re,{className:"rdt_TableCol",$headCell:t,$noPadding:!0},i.createElement(A,{name:"select-all-rows",component:s,componentOptions:d,onClick:()=>{u({type:"SELECT_ALL_ROWS",rows:p,rowCount:h,mergeSelections:a,keyField:o})},checked:l,indeterminate:g,disabled:b}))}function se(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t.Nm.AUTO;const n="object"==typeof window,[o,l]=i.useState(!1);return i.useEffect((()=>{if(n)if("auto"!==e)l("rtl"===e);else{const e=!(!window.document||!window.document.createElement),t=document.getElementsByTagName("BODY")[0],n=document.getElementsByTagName("HTML")[0],o="rtl"===t.dir||"rtl"===n.dir;l(e&&o)}}),[e,n]),o}const de=d.default.div`
	display: flex;
	align-items: center;
	flex: 1 0 auto;
	height: 100%;
	color: ${e=>{let{theme:t}=e;return t.contextMenu.fontColor}};
	font-size: ${e=>{let{theme:t}=e;return t.contextMenu.fontSize}};
	font-weight: 400;
`,ce=d.default.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;
`,ue=d.default.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-sizing: inherit;
	z-index: 1;
	align-items: center;
	justify-content: space-between;
	display: flex;
	${e=>{let{$rtl:t}=e;return t&&"direction: rtl"}};
	${e=>{let{theme:t}=e;return t.contextMenu.style}};
	${e=>{let{theme:t,$visible:n}=e;return n&&t.contextMenu.activeStyle}};
`;function ge(e){let{contextMessage:t,contextActions:n,contextComponent:o,selectedCount:l,direction:a}=e;const r=se(a),s=l>0;return o?i.createElement(ue,{$visible:s},i.cloneElement(o,{selectedCount:l})):i.createElement(ue,{$visible:s,$rtl:r},i.createElement(de,null,((e,t,n)=>{if(0===t)return null;const o=1===t?e.singular:e.plural;return n?`${t} ${e.message||""} ${o}`:`${t} ${o} ${e.message||""}`})(t,l,r)),i.createElement(ce,null,n))}const pe=d.default.div`
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	display: flex;
	flex: 1 1 auto;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;
	${e=>{let{theme:t}=e;return t.header.style}}
`,be=d.default.div`
	flex: 1 0 auto;
	color: ${e=>{let{theme:t}=e;return t.header.fontColor}};
	font-size: ${e=>{let{theme:t}=e;return t.header.fontSize}};
	font-weight: 400;
`,he=d.default.div`
	flex: 1 0 auto;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	> * {
		margin-left: 5px;
	}
`,fe=e=>{let{title:t,actions:n=null,contextMessage:o,contextActions:l,contextComponent:a,selectedCount:r,direction:s,showMenu:d=!0}=e;return i.createElement(pe,{className:"rdt_TableHeader",role:"heading","aria-level":1},i.createElement(be,null,t),n&&i.createElement(he,null,n),d&&i.createElement(ge,{contextMessage:o,contextActions:l,contextComponent:a,direction:s,selectedCount:r}))};function me(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var l=0;for(o=Object.getOwnPropertySymbols(e);l<o.length;l++)t.indexOf(o[l])<0&&Object.prototype.propertyIsEnumerable.call(e,o[l])&&(n[o[l]]=e[o[l]])}return n}"function"==typeof SuppressedError&&SuppressedError;const we={left:"flex-start",right:"flex-end",center:"center"},xe=d.default.header`
	position: relative;
	display: flex;
	flex: 1 1 auto;
	box-sizing: border-box;
	align-items: center;
	padding: 4px 16px 4px 24px;
	width: 100%;
	justify-content: ${e=>{let{align:t}=e;return we[t]}};
	flex-wrap: ${e=>{let{$wrapContent:t}=e;return t?"wrap":"nowrap"}};
	${e=>{let{theme:t}=e;return t.subHeader.style}}
`,Ce=e=>{var{align:t="right",wrapContent:n=!0}=e,o=me(e,["align","wrapContent"]);return i.createElement(xe,Object.assign({align:t,$wrapContent:n},o))},ve=d.default.div`
	display: flex;
	flex-direction: column;
`,ye=d.default.div`
	position: relative;
	width: 100%;
	border-radius: inherit;
	${e=>{let{$responsive:t,$fixedHeader:n}=e;return t&&l.css`
			overflow-x: auto;

			// hidden prevents vertical scrolling in firefox when fixedHeader is disabled
			overflow-y: ${n?"auto":"hidden"};
			min-height: 0;
		`}};

	${e=>{let{$fixedHeader:t=!1,$fixedHeaderScrollHeight:n="100vh"}=e;return t&&l.css`
			max-height: ${n};
			-webkit-overflow-scrolling: touch;
		`}};

	${e=>{let{theme:t}=e;return t.responsiveWrapper.style}};
`,Re=d.default.div`
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${e=>e.theme.progress.style};
`,Se=d.default.div`
	position: relative;
	width: 100%;
	${e=>{let{theme:t}=e;return t.tableWrapper.style}};
`,Ee=d.default(D)`
	white-space: nowrap;
	${e=>{let{theme:t}=e;return t.expanderCell.style}};
`,Oe=d.default.div`
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${e=>{let{theme:t}=e;return t.noData.style}};
`,$e=()=>s.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},s.default.createElement("path",{d:"M7 10l5 5 5-5z"}),s.default.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),ke=d.default.select`
	cursor: pointer;
	height: 24px;
	max-width: 100%;
	user-select: none;
	padding-left: 8px;
	padding-right: 24px;
	box-sizing: content-box;
	font-size: inherit;
	color: inherit;
	border: none;
	background-color: transparent;
	appearance: none;
	direction: ltr;
	flex-shrink: 0;

	&::-ms-expand {
		display: none;
	}

	&:disabled::-ms-expand {
		background: #f60;
	}

	option {
		color: initial;
	}
`,Pe=d.default.div`
	position: relative;
	flex-shrink: 0;
	font-size: inherit;
	color: inherit;
	margin-top: 1px;

	svg {
		top: 0;
		right: 0;
		color: inherit;
		position: absolute;
		fill: currentColor;
		width: 24px;
		height: 24px;
		display: inline-block;
		user-select: none;
		pointer-events: none;
	}
`,De=e=>{var{defaultValue:t,onChange:n}=e,o=me(e,["defaultValue","onChange"]);return i.createElement(Pe,null,i.createElement(ke,Object.assign({onChange:n,defaultValue:t},o)),i.createElement($e,null))},He={columns:[],data:[],title:"",keyField:"id",selectableRows:!1,selectableRowsHighlight:!1,selectableRowsNoSelectAll:!1,selectableRowSelected:null,selectableRowDisabled:null,selectableRowsComponent:"input",selectableRowsComponentProps:{},selectableRowsVisibleOnly:!1,selectableRowsSingle:!1,clearSelectedRows:!1,expandableRows:!1,expandableRowDisabled:null,expandableRowExpanded:null,expandOnRowClicked:!1,expandableRowsHideExpander:!1,expandOnRowDoubleClicked:!1,expandableInheritConditionalStyles:!1,expandableRowsComponent:function(){return s.default.createElement("div",null,"To add an expander pass in a component instance via ",s.default.createElement("strong",null,"expandableRowsComponent"),". You can then access props.data from this component.")},expandableIcon:{collapsed:s.default.createElement((()=>s.default.createElement("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},s.default.createElement("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),s.default.createElement("path",{d:"M0-.25h24v24H0z",fill:"none"}))),null),expanded:s.default.createElement((()=>s.default.createElement("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},s.default.createElement("path",{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}),s.default.createElement("path",{d:"M0-.75h24v24H0z",fill:"none"}))),null)},expandableRowsComponentProps:{},progressPending:!1,progressComponent:s.default.createElement("div",{style:{fontSize:"24px",fontWeight:700,padding:"24px"}},"Loading..."),persistTableHead:!1,sortIcon:null,sortFunction:null,sortServer:!1,striped:!1,highlightOnHover:!1,pointerOnHover:!1,noContextMenu:!1,contextMessage:{singular:"item",plural:"items",message:"selected"},actions:null,contextActions:null,contextComponent:null,defaultSortFieldId:null,defaultSortAsc:!0,responsive:!0,noDataComponent:s.default.createElement("div",{style:{padding:"24px"}},"There are no records to display"),disabled:!1,noTableHead:!1,noHeader:!1,subHeader:!1,subHeaderAlign:t.v2.RIGHT,subHeaderWrap:!0,subHeaderComponent:null,fixedHeader:!1,fixedHeaderScrollHeight:"100vh",pagination:!1,paginationServer:!1,paginationServerOptions:{persistSelectedOnSort:!1,persistSelectedOnPageChange:!1},paginationDefaultPage:1,paginationResetDefaultPage:!1,paginationTotalRows:0,paginationPerPage:10,paginationRowsPerPageOptions:[10,15,20,25,30],paginationComponent:null,paginationComponentOptions:{},paginationIconFirstPage:s.default.createElement((()=>s.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},s.default.createElement("path",{d:"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"}),s.default.createElement("path",{fill:"none",d:"M24 24H0V0h24v24z"}))),null),paginationIconLastPage:s.default.createElement((()=>s.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},s.default.createElement("path",{d:"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"}),s.default.createElement("path",{fill:"none",d:"M0 0h24v24H0V0z"}))),null),paginationIconNext:s.default.createElement((()=>s.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},s.default.createElement("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),s.default.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}))),null),paginationIconPrevious:s.default.createElement((()=>s.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},s.default.createElement("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),s.default.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}))),null),dense:!1,conditionalRowStyles:[],theme:"default",customStyles:{},direction:t.Nm.AUTO,onChangePage:f,onChangeRowsPerPage:f,onRowClicked:f,onRowDoubleClicked:f,onRowMouseEnter:f,onRowMouseLeave:f,onRowExpandToggled:f,onSelectedRowsChange:f,onSort:f,onColumnOrderChange:f},je={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},Fe=d.default.nav`
	display: flex;
	flex: 1 1 auto;
	justify-content: flex-end;
	align-items: center;
	box-sizing: border-box;
	padding-right: 8px;
	padding-left: 8px;
	width: 100%;
	${e=>{let{theme:t}=e;return t.pagination.style}};
`,Ie=d.default.button`
	position: relative;
	display: block;
	user-select: none;
	border: none;
	${e=>{let{theme:t}=e;return t.pagination.pageButtonsStyle}};
	${e=>{let{$isRTL:t}=e;return t&&"transform: scale(-1, -1)"}};
`,Te=d.default.div`
	display: flex;
	align-items: center;
	border-radius: 4px;
	white-space: nowrap;
	${$`
    width: 100%;
    justify-content: space-around;
  `};
`,Ae=d.default.span`
	flex-shrink: 1;
	user-select: none;
`,Me=d.default(Ae)`
	margin: 0 24px;
`,Le=d.default(Ae)`
	margin: 0 4px;
`;var _e=i.memo((function(e){let{rowsPerPage:t,rowCount:n,currentPage:o,direction:l=He.direction,paginationRowsPerPageOptions:a=He.paginationRowsPerPageOptions,paginationIconLastPage:r=He.paginationIconLastPage,paginationIconFirstPage:s=He.paginationIconFirstPage,paginationIconNext:d=He.paginationIconNext,paginationIconPrevious:c=He.paginationIconPrevious,paginationComponentOptions:u=He.paginationComponentOptions,onChangeRowsPerPage:g=He.onChangeRowsPerPage,onChangePage:p=He.onChangePage}=e;const h=(()=>{const e="object"==typeof window;function t(){return{width:e?window.innerWidth:void 0,height:e?window.innerHeight:void 0}}const[n,o]=i.useState(t);return i.useEffect((()=>{if(!e)return()=>null;function n(){o(t())}return window.addEventListener("resize",n),()=>window.removeEventListener("resize",n)}),[]),n})(),f=se(l),m=h.width&&h.width>599,w=b(n,t),x=o*t,C=x-t+1,v=1===o,y=o===w,R=Object.assign(Object.assign({},je),u),S=o===w?`${C}-${n} ${R.rangeSeparatorText} ${n}`:`${C}-${x} ${R.rangeSeparatorText} ${n}`,E=i.useCallback((()=>p(o-1)),[o,p]),O=i.useCallback((()=>p(o+1)),[o,p]),$=i.useCallback((()=>p(1)),[p]),k=i.useCallback((()=>p(b(n,t))),[p,n,t]),P=i.useCallback((e=>g(Number(e.target.value),o)),[o,g]),D=a.map((e=>i.createElement("option",{key:e,value:e},e)));R.selectAllRowsItem&&D.push(i.createElement("option",{key:-1,value:n},R.selectAllRowsItemText));const H=i.createElement(De,{onChange:P,defaultValue:t,"aria-label":R.rowsPerPageText},D);return i.createElement(Fe,{className:"rdt_Pagination"},!R.noRowsPerPage&&m&&i.createElement(i.Fragment,null,i.createElement(Le,null,R.rowsPerPageText),H),m&&i.createElement(Me,null,S),i.createElement(Te,null,i.createElement(Ie,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":v,onClick:$,disabled:v,$isRTL:f},s),i.createElement(Ie,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":v,onClick:E,disabled:v,$isRTL:f},c),!R.noRowsPerPage&&!m&&H,i.createElement(Ie,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":y,onClick:O,disabled:y,$isRTL:f},d),i.createElement(Ie,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":y,onClick:k,disabled:y,$isRTL:f},r)))}));const Ne=(e,t)=>{const n=i.useRef(!0);i.useEffect((()=>{n.current?n.current=!1:e()}),t)};var ze=function(e){return function(e){return!!e&&"object"==typeof e}(e)&&!function(e){var t=Object.prototype.toString.call(e);return"[object RegExp]"===t||"[object Date]"===t||function(e){return e.$$typeof===We}(e)}(e)},We="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function Be(e,t){return!1!==t.clone&&t.isMergeableObject(e)?Ye((n=e,Array.isArray(n)?[]:{}),e,t):e;var n}function Ge(e,t,n){return e.concat(t).map((function(e){return Be(e,n)}))}function Ve(e){return Object.keys(e).concat(function(e){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e).filter((function(t){return Object.propertyIsEnumerable.call(e,t)})):[]}(e))}function Ue(e,t){try{return t in e}catch(e){return!1}}function Ye(e,t,n){(n=n||{}).arrayMerge=n.arrayMerge||Ge,n.isMergeableObject=n.isMergeableObject||ze,n.cloneUnlessOtherwiseSpecified=Be;var o=Array.isArray(t);return o===Array.isArray(e)?o?n.arrayMerge(e,t,n):function(e,t,n){var o={};return n.isMergeableObject(e)&&Ve(e).forEach((function(t){o[t]=Be(e[t],n)})),Ve(t).forEach((function(l){(function(e,t){return Ue(e,t)&&!(Object.hasOwnProperty.call(e,t)&&Object.propertyIsEnumerable.call(e,t))})(e,l)||(Ue(e,l)&&n.isMergeableObject(t[l])?o[l]=function(e,t){if(!t.customMerge)return Ye;var n=t.customMerge(e);return"function"==typeof n?n:Ye}(l,n)(e[l],t[l],n):o[l]=Be(t[l],n))})),o}(e,t,n):Be(t,n)}Ye.all=function(e,t){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce((function(e,n){return Ye(e,n,t)}),{})};var Ke=function(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}(Ye);const Ze={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.54)",disabled:"rgba(0, 0, 0, 0.38)"},background:{default:"#FFFFFF"},context:{background:"#e3f2fd",text:"rgba(0, 0, 0, 0.87)"},divider:{default:"rgba(0,0,0,.12)"},button:{default:"rgba(0,0,0,.54)",focus:"rgba(0,0,0,.12)",hover:"rgba(0,0,0,.12)",disabled:"rgba(0, 0, 0, .18)"},selected:{default:"#e3f2fd",text:"rgba(0, 0, 0, 0.87)"},highlightOnHover:{default:"#EEEEEE",text:"rgba(0, 0, 0, 0.87)"},striped:{default:"#FAFAFA",text:"rgba(0, 0, 0, 0.87)"}},qe={default:Ze,light:Ze,dark:{text:{primary:"#FFFFFF",secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(0,0,0,.12)"},background:{default:"#424242"},context:{background:"#E91E63",text:"#FFFFFF"},divider:{default:"rgba(81, 81, 81, 1)"},button:{default:"#FFFFFF",focus:"rgba(255, 255, 255, .54)",hover:"rgba(255, 255, 255, .12)",disabled:"rgba(255, 255, 255, .18)"},selected:{default:"rgba(0, 0, 0, .7)",text:"#FFFFFF"},highlightOnHover:{default:"rgba(0, 0, 0, .7)",text:"#FFFFFF"},striped:{default:"rgba(0, 0, 0, .87)",text:"#FFFFFF"}}};function Je(e,t,n,o){const[l,a]=i.useState((()=>p(e))),[s,d]=i.useState(""),c=i.useRef("");Ne((()=>{a(p(e))}),[e]);const u=i.useCallback((e=>{var t,n,o;const{attributes:a}=e.target,r=null===(t=a.getNamedItem("data-column-id"))||void 0===t?void 0:t.value;r&&(c.current=(null===(o=null===(n=l[x(l,r)])||void 0===n?void 0:n.id)||void 0===o?void 0:o.toString())||"",d(c.current))}),[l]),g=i.useCallback((e=>{var n;const{attributes:o}=e.target,r=null===(n=o.getNamedItem("data-column-id"))||void 0===n?void 0:n.value;if(r&&c.current&&r!==c.current){const e=x(l,c.current),n=x(l,r),o=[...l];o[e]=l[n],o[n]=l[e],a(o),t(o)}}),[t,l]),b=i.useCallback((e=>{e.preventDefault()}),[]),h=i.useCallback((e=>{e.preventDefault()}),[]),f=i.useCallback((e=>{e.preventDefault(),c.current="",d("")}),[]),m=function(){return arguments.length>0&&void 0!==arguments[0]&&arguments[0]?r.ASC:r.DESC}(o),w=i.useMemo((()=>l[x(l,null==n?void 0:n.toString())]||{}),[n,l]);return{tableColumns:l,draggingColumnId:s,handleDragStart:u,handleDragEnter:g,handleDragOver:b,handleDragLeave:h,handleDragEnd:f,defaultSortDirection:m,defaultSortColumn:w}}var Qe=i.memo((function(e){const{data:t=He.data,columns:n=He.columns,title:o=He.title,actions:a=He.actions,keyField:s=He.keyField,striped:d=He.striped,highlightOnHover:u=He.highlightOnHover,pointerOnHover:g=He.pointerOnHover,dense:p=He.dense,selectableRows:f=He.selectableRows,selectableRowsSingle:m=He.selectableRowsSingle,selectableRowsHighlight:x=He.selectableRowsHighlight,selectableRowsNoSelectAll:C=He.selectableRowsNoSelectAll,selectableRowsVisibleOnly:y=He.selectableRowsVisibleOnly,selectableRowSelected:S=He.selectableRowSelected,selectableRowDisabled:$=He.selectableRowDisabled,selectableRowsComponent:k=He.selectableRowsComponent,selectableRowsComponentProps:P=He.selectableRowsComponentProps,onRowExpandToggled:H=He.onRowExpandToggled,onSelectedRowsChange:j=He.onSelectedRowsChange,expandableIcon:F=He.expandableIcon,onChangeRowsPerPage:I=He.onChangeRowsPerPage,onChangePage:T=He.onChangePage,paginationServer:A=He.paginationServer,paginationServerOptions:M=He.paginationServerOptions,paginationTotalRows:L=He.paginationTotalRows,paginationDefaultPage:_=He.paginationDefaultPage,paginationResetDefaultPage:N=He.paginationResetDefaultPage,paginationPerPage:z=He.paginationPerPage,paginationRowsPerPageOptions:W=He.paginationRowsPerPageOptions,paginationIconLastPage:B=He.paginationIconLastPage,paginationIconFirstPage:G=He.paginationIconFirstPage,paginationIconNext:V=He.paginationIconNext,paginationIconPrevious:U=He.paginationIconPrevious,paginationComponent:Y=He.paginationComponent,paginationComponentOptions:K=He.paginationComponentOptions,responsive:Z=He.responsive,progressPending:q=He.progressPending,progressComponent:J=He.progressComponent,persistTableHead:X=He.persistTableHead,noDataComponent:ee=He.noDataComponent,disabled:te=He.disabled,noTableHead:ne=He.noTableHead,noHeader:oe=He.noHeader,fixedHeader:le=He.fixedHeader,fixedHeaderScrollHeight:re=He.fixedHeaderScrollHeight,pagination:se=He.pagination,subHeader:de=He.subHeader,subHeaderAlign:ce=He.subHeaderAlign,subHeaderWrap:ue=He.subHeaderWrap,subHeaderComponent:ge=He.subHeaderComponent,noContextMenu:pe=He.noContextMenu,contextMessage:be=He.contextMessage,contextActions:he=He.contextActions,contextComponent:me=He.contextComponent,expandableRows:we=He.expandableRows,onRowClicked:xe=He.onRowClicked,onRowDoubleClicked:$e=He.onRowDoubleClicked,onRowMouseEnter:ke=He.onRowMouseEnter,onRowMouseLeave:Pe=He.onRowMouseLeave,sortIcon:De=He.sortIcon,onSort:je=He.onSort,sortFunction:Fe=He.sortFunction,sortServer:Ie=He.sortServer,expandableRowsComponent:Te=He.expandableRowsComponent,expandableRowsComponentProps:Ae=He.expandableRowsComponentProps,expandableRowDisabled:Me=He.expandableRowDisabled,expandableRowsHideExpander:Le=He.expandableRowsHideExpander,expandOnRowClicked:ze=He.expandOnRowClicked,expandOnRowDoubleClicked:We=He.expandOnRowDoubleClicked,expandableRowExpanded:Be=He.expandableRowExpanded,expandableInheritConditionalStyles:Ge=He.expandableInheritConditionalStyles,defaultSortFieldId:Ve=He.defaultSortFieldId,defaultSortAsc:Ue=He.defaultSortAsc,clearSelectedRows:Ye=He.clearSelectedRows,conditionalRowStyles:Ze=He.conditionalRowStyles,theme:Qe=He.theme,customStyles:Xe=He.customStyles,direction:et=He.direction,onColumnOrderChange:tt=He.onColumnOrderChange,className:nt}=e,{tableColumns:ot,draggingColumnId:lt,handleDragStart:at,handleDragEnter:rt,handleDragOver:it,handleDragLeave:st,handleDragEnd:dt,defaultSortDirection:ct,defaultSortColumn:ut}=Je(n,tt,Ve,Ue),[{rowsPerPage:gt,currentPage:pt,selectedRows:bt,allSelected:ht,selectedCount:ft,selectedColumn:mt,sortDirection:wt,toggleOnSelectedRowsChange:xt},Ct]=i.useReducer(v,{allSelected:!1,selectedCount:0,selectedRows:[],selectedColumn:ut,toggleOnSelectedRowsChange:!1,sortDirection:ct,currentPage:_,rowsPerPage:z,selectedRowsFlag:!1,contextMessage:He.contextMessage}),{persistSelectedOnSort:vt=!1,persistSelectedOnPageChange:yt=!1}=M,Rt=!(!A||!yt&&!vt),St=se&&!q&&t.length>0,Et=Y||_e,Ot=i.useMemo((()=>function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"default";const o=qe[t]?t:n;return Ke({table:{style:{color:(l=qe[o]).text.primary,backgroundColor:l.background.default}},tableWrapper:{style:{display:"table"}},responsiveWrapper:{style:{}},header:{style:{fontSize:"22px",color:l.text.primary,backgroundColor:l.background.default,minHeight:"56px",paddingLeft:"16px",paddingRight:"8px"}},subHeader:{style:{backgroundColor:l.background.default,minHeight:"52px"}},head:{style:{color:l.text.primary,fontSize:"12px",fontWeight:500}},headRow:{style:{backgroundColor:l.background.default,minHeight:"52px",borderBottomWidth:"1px",borderBottomColor:l.divider.default,borderBottomStyle:"solid"},denseStyle:{minHeight:"32px"}},headCells:{style:{paddingLeft:"16px",paddingRight:"16px"},draggingStyle:{cursor:"move"}},contextMenu:{style:{backgroundColor:l.context.background,fontSize:"18px",fontWeight:400,color:l.context.text,paddingLeft:"16px",paddingRight:"8px",transform:"translate3d(0, -100%, 0)",transitionDuration:"125ms",transitionTimingFunction:"cubic-bezier(0, 0, 0.2, 1)",willChange:"transform"},activeStyle:{transform:"translate3d(0, 0, 0)"}},cells:{style:{paddingLeft:"16px",paddingRight:"16px",wordBreak:"break-word"},draggingStyle:{}},rows:{style:{fontSize:"13px",fontWeight:400,color:l.text.primary,backgroundColor:l.background.default,minHeight:"48px","&:not(:last-of-type)":{borderBottomStyle:"solid",borderBottomWidth:"1px",borderBottomColor:l.divider.default}},denseStyle:{minHeight:"32px"},selectedHighlightStyle:{"&:nth-of-type(n)":{color:l.selected.text,backgroundColor:l.selected.default,borderBottomColor:l.background.default}},highlightOnHoverStyle:{color:l.highlightOnHover.text,backgroundColor:l.highlightOnHover.default,transitionDuration:"0.15s",transitionProperty:"background-color",borderBottomColor:l.background.default,outlineStyle:"solid",outlineWidth:"1px",outlineColor:l.background.default},stripedStyle:{color:l.striped.text,backgroundColor:l.striped.default}},expanderRow:{style:{color:l.text.primary,backgroundColor:l.background.default}},expanderCell:{style:{flex:"0 0 48px"}},expanderButton:{style:{color:l.button.default,fill:l.button.default,backgroundColor:"transparent",borderRadius:"2px",transition:"0.25s",height:"100%",width:"100%","&:hover:enabled":{cursor:"pointer"},"&:disabled":{color:l.button.disabled},"&:hover:not(:disabled)":{cursor:"pointer",backgroundColor:l.button.hover},"&:focus":{outline:"none",backgroundColor:l.button.focus},svg:{margin:"auto"}}},pagination:{style:{color:l.text.secondary,fontSize:"13px",minHeight:"56px",backgroundColor:l.background.default,borderTopStyle:"solid",borderTopWidth:"1px",borderTopColor:l.divider.default},pageButtonsStyle:{borderRadius:"50%",height:"40px",width:"40px",padding:"8px",margin:"px",cursor:"pointer",transition:"0.4s",color:l.button.default,fill:l.button.default,backgroundColor:"transparent","&:disabled":{cursor:"unset",color:l.button.disabled,fill:l.button.disabled},"&:hover:not(:disabled)":{backgroundColor:l.button.hover},"&:focus":{outline:"none",backgroundColor:l.button.focus}}},noData:{style:{display:"flex",alignItems:"center",justifyContent:"center",color:l.text.primary,backgroundColor:l.background.default}},progress:{style:{display:"flex",alignItems:"center",justifyContent:"center",color:l.text.primary,backgroundColor:l.background.default}}},e);var l}(Xe,Qe)),[Xe,Qe]),$t=i.useMemo((()=>Object.assign({},"auto"!==et&&{dir:et})),[et]),kt=i.useMemo((()=>{if(Ie)return t;if((null==mt?void 0:mt.sortFunction)&&"function"==typeof mt.sortFunction){const e=mt.sortFunction,n=wt===r.ASC?e:(t,n)=>-1*e(t,n);return[...t].sort(n)}return function(e,t,n,o){return t?o&&"function"==typeof o?o(e.slice(0),t,n):e.slice(0).sort(((e,o)=>{const l=t(e),a=t(o);if("asc"===n){if(l<a)return-1;if(l>a)return 1}if("desc"===n){if(l>a)return-1;if(l<a)return 1}return 0})):e}(t,null==mt?void 0:mt.selector,wt,Fe)}),[Ie,mt,wt,t,Fe]),Pt=i.useMemo((()=>{if(se&&!A){const e=pt*gt,t=e-gt;return kt.slice(t,e)}return kt}),[pt,se,A,gt,kt]),Dt=i.useCallback((e=>{Ct(e)}),[]),Ht=i.useCallback((e=>{Ct(e)}),[]),jt=i.useCallback((e=>{Ct(e)}),[]),Ft=i.useCallback(((e,t)=>xe(e,t)),[xe]),It=i.useCallback(((e,t)=>$e(e,t)),[$e]),Tt=i.useCallback(((e,t)=>ke(e,t)),[ke]),At=i.useCallback(((e,t)=>Pe(e,t)),[Pe]),Mt=i.useCallback((e=>Ct({type:"CHANGE_PAGE",page:e,paginationServer:A,visibleOnly:y,persistSelectedOnPageChange:yt})),[A,yt,y]),Lt=i.useCallback((e=>{const t=b(L||Pt.length,e),n=h(pt,t);A||Mt(n),Ct({type:"CHANGE_ROWS_PER_PAGE",page:n,rowsPerPage:e})}),[pt,Mt,A,L,Pt.length]);if(se&&!A&&kt.length>0&&0===Pt.length){const e=b(kt.length,gt),t=h(pt,e);Mt(t)}Ne((()=>{j({allSelected:ht,selectedCount:ft,selectedRows:bt.slice(0)})}),[xt]),Ne((()=>{je(mt,wt,kt.slice(0))}),[mt,wt]),Ne((()=>{T(pt,L||kt.length)}),[pt]),Ne((()=>{I(gt,pt)}),[gt]),Ne((()=>{Mt(_)}),[_,N]),Ne((()=>{if(se&&A&&L>0){const e=b(L,gt),t=h(pt,e);pt!==t&&Mt(t)}}),[L]),i.useEffect((()=>{Ct({type:"CLEAR_SELECTED_ROWS",selectedRowsFlag:Ye})}),[m,Ye]),i.useEffect((()=>{if(!S)return;const e=kt.filter((e=>S(e))),t=m?e.slice(0,1):e;Ct({type:"SELECT_MULTIPLE_ROWS",keyField:s,selectedRows:t,totalRows:kt.length,mergeSelections:Rt})}),[t,S]);const _t=y?Pt:kt,Nt=yt||m||C;return i.createElement(l.ThemeProvider,{theme:Ot},!oe&&(!!o||!!a)&&i.createElement(fe,{title:o,actions:a,showMenu:!pe,selectedCount:ft,direction:et,contextActions:he,contextComponent:me,contextMessage:be}),de&&i.createElement(Ce,{align:ce,wrapContent:ue},ge),i.createElement(ye,Object.assign({$responsive:Z,$fixedHeader:le,$fixedHeaderScrollHeight:re,className:nt},$t),i.createElement(Se,null,q&&!X&&i.createElement(Re,null,J),i.createElement(R,{disabled:te,className:"rdt_Table",role:"table"},!ne&&(!!X||kt.length>0&&!q)&&i.createElement(E,{className:"rdt_TableHead",role:"rowgroup",$fixedHeader:le},i.createElement(O,{className:"rdt_TableHeadRow",role:"row",$dense:p},f&&(Nt?i.createElement(D,{style:{flex:"0 0 48px"}}):i.createElement(ie,{allSelected:ht,selectedRows:bt,selectableRowsComponent:k,selectableRowsComponentProps:P,selectableRowDisabled:$,rowData:_t,keyField:s,mergeSelections:Rt,onSelectAllRows:Ht})),we&&!Le&&i.createElement(Ee,null),ot.map((e=>i.createElement(ae,{key:e.id,column:e,selectedColumn:mt,disabled:q||0===kt.length,pagination:se,paginationServer:A,persistSelectedOnSort:vt,selectableRowsVisibleOnly:y,sortDirection:wt,sortIcon:De,sortServer:Ie,onSort:Dt,onDragStart:at,onDragOver:it,onDragEnd:dt,onDragEnter:rt,onDragLeave:st,draggingColumnId:lt}))))),!kt.length&&!q&&i.createElement(Oe,null,ee),q&&X&&i.createElement(Re,null,J),!q&&kt.length>0&&i.createElement(ve,{className:"rdt_TableBody",role:"rowgroup"},Pt.map(((e,t)=>{const n=c(e,s),o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return"number"!=typeof e&&(!e||0===e.length)}(n)?t:n,l=w(e,bt,s),a=!!(we&&Be&&Be(e)),r=!!(we&&Me&&Me(e));return i.createElement(Q,{id:o,key:o,keyField:s,"data-row-id":o,columns:ot,row:e,rowCount:kt.length,rowIndex:t,selectableRows:f,expandableRows:we,expandableIcon:F,highlightOnHover:u,pointerOnHover:g,dense:p,expandOnRowClicked:ze,expandOnRowDoubleClicked:We,expandableRowsComponent:Te,expandableRowsComponentProps:Ae,expandableRowsHideExpander:Le,defaultExpanderDisabled:r,defaultExpanded:a,expandableInheritConditionalStyles:Ge,conditionalRowStyles:Ze,selected:l,selectableRowsHighlight:x,selectableRowsComponent:k,selectableRowsComponentProps:P,selectableRowDisabled:$,selectableRowsSingle:m,striped:d,onRowExpandToggled:H,onRowClicked:Ft,onRowDoubleClicked:It,onRowMouseEnter:Tt,onRowMouseLeave:At,onSelectedRow:jt,draggingColumnId:lt,onDragStart:at,onDragOver:it,onDragEnd:dt,onDragEnter:rt,onDragLeave:st})})))))),St&&i.createElement("div",null,i.createElement(Et,{onChangePage:Mt,onChangeRowsPerPage:Lt,rowCount:L||kt.length,currentPage:pt,rowsPerPage:gt,direction:et,paginationRowsPerPageOptions:W,paginationIconLastPage:B,paginationIconFirstPage:G,paginationIconNext:V,paginationIconPrevious:U,paginationComponentOptions:K})))}));t.ZP=Qe}}]);
//# sourceMappingURL=513.4ec55438.chunk.js.map
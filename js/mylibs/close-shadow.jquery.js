(function ( $ ) {
	var jQuery = $;
	
	$.fn.closeShadow = function ( options ) {  
		var color = $(this).css('color');

		var settings = {
			'dark-shadow': $.Color(color).lightness(0.2),
			'light-shadow': $.Color(color).lightness(0.4),
			'depth': 8,
			'follow': true
		};

		return this.each(function () {        
			// If options exist, lets merge them
			// with our default settings
			if ( options ) { 
				$.extend( settings, options );
			}

			// Plugin code here
			
			var $this = $(this);
			
			function shadowify() {
				var shadow = '';
				
				for (var i = 1; i < settings.depth; i++) {
					shadow = shadow + i + 'px ' + (i-1) + 'px ' + settings['light-shadow'] + ', ';
					shadow = shadow + i + 'px ' + (i+1) + 'px ' + settings['dark-shadow'] + ', ';
				}
				
				shadow = shadow.slice(0, -2);
				
				$this.css({
					'text-shadow': shadow,
					'text-indent': -settings.depth + 'px'
				});
			}
			
			function movify() {
				var shadow = '';
				
				var maxOffset = (settings.depth / $(document).width()) * ((event.pageX*2)-$(document).width());
				
				for (var i = 1; i < settings.depth; i++) {
					var x = ((maxOffset / settings.depth) * i);
					
					shadow = shadow + x + 'px ' + (i-1) + 'px ' + settings['light-shadow'] + ', ';
					shadow = shadow + x + 'px ' + (i+1) + 'px ' + settings['dark-shadow'] + ', ';
				}
				
				shadow = shadow.slice(0, -2);
				
				$this.css({
					'text-shadow': shadow,
					'text-indent': -((maxOffset * 2)) + 'px'
				});
			}
			
			if (settings.follow) {
				$('html').mousemove(function (event) {
					movify();
				});
			}
			else {
				shadowify();
			}
		});

	};
	
	
	
	
	/*
	 * jQuery Color Animations v@VERSION
	 * http://jquery.org/
	 *
	 * Copyright 2011 John Resig
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 * http://jquery.org/license
	 *
	 * Date: @DATE
	 */
	(function(jQuery,undefined){var stepHooks="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color outlineColor".split(" "),rplusequals=/^([\-+])=\s*(\d+\.?\d*)/,stringParsers=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(execResult){return[execResult[1],execResult[2],execResult[3],execResult[4]];}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(execResult){return[2.55*execResult[1],2.55*execResult[2],2.55*execResult[3],execResult[4]];}},{re:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(execResult){return[parseInt(execResult[1],16),parseInt(execResult[2],16),parseInt(execResult[3],16)];}},{re:/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,parse:function(execResult){return[parseInt(execResult[1]+execResult[1],16),parseInt(execResult[2]+execResult[2],16),parseInt(execResult[3]+execResult[3],16)];}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(execResult){return[execResult[1],execResult[2]/100,execResult[3]/100,execResult[4]];}}],color=jQuery.Color=function(color,green,blue,alpha){return new jQuery.Color.fn.parse(color,green,blue,alpha);},spaces={rgba:{cache:"_rgba",props:{red:{idx:0,type:"byte",empty:true},green:{idx:1,type:"byte",empty:true},blue:{idx:2,type:"byte",empty:true},alpha:{idx:3,type:"percent",def:1}}},hsla:{cache:"_hsla",props:{hue:{idx:0,type:"degrees",empty:true},saturation:{idx:1,type:"percent",empty:true},lightness:{idx:2,type:"percent",empty:true}}}},propTypes={"byte":{floor:true,min:0,max:255},"percent":{min:0,max:1},"degrees":{mod:360,floor:true}},rgbaspace=spaces.rgba.props,support=color.support={},colors,each=jQuery.each;spaces.hsla.props.alpha=rgbaspace.alpha;function clamp(value,prop,alwaysAllowEmpty){var type=propTypes[prop.type]||{},allowEmpty=prop.empty||alwaysAllowEmpty;if(allowEmpty&&value==null){return null;}
	if(prop.def&&value==null){return prop.def;}
	if(type.floor){value=~~value;}else{value=parseFloat(value);}
	if(jQuery.isNaN(value)){return prop.def;}
	if(type.mod){value=value%type.mod;return value<0?type.mod+value:value;}
	return type.min>value?type.min:type.max<value?type.max:value;}
	color.fn=color.prototype={constructor:color,parse:function(red,green,blue,alpha){if(red===undefined){this._rgba=[null,null,null,null];return this;}
	if(red instanceof jQuery||red.nodeType){red=red instanceof jQuery?red.css(green):jQuery(red).css(green);green=undefined;}
	var inst=this,type=jQuery.type(red),rgba=this._rgba=[],source;if(green!==undefined){red=[red,green,blue,alpha];type="array";}
	if(type==="string"){red=red.toLowerCase();each(stringParsers,function(i,parser){var match=parser.re.exec(red),values=match&&parser.parse(match),parsed,spaceName=parser.space||"rgba",cache=spaces[spaceName].cache;if(values){parsed=inst[spaceName](values);inst[cache]=parsed[cache];rgba=inst._rgba=parsed._rgba;return false;}});if(rgba.length!==0){if(Math.max.apply(Math,rgba)===0){jQuery.extend(rgba,colors.transparent);}
	return this;}
	red=colors[red]||colors._default;return this.parse(red);}
	if(type==="array"){each(rgbaspace,function(key,prop){rgba[prop.idx]=clamp(red[prop.idx],prop);});return this;}
	if(type==="object"){if(red instanceof color){each(spaces,function(spaceName,space){if(red[space.cache]){inst[space.cache]=red[space.cache].slice();}});}else{each(spaces,function(spaceName,space){each(space.props,function(key,prop){var cache=space.cache;if(!inst[cache]&&space.to){if(red[key]==null||key==="alpha"){return;}
	inst[cache]=space.to(inst._rgba);}
	inst[cache][prop.idx]=clamp(red[key],prop,true);});});}
	return this;}},is:function(compare){var is=color(compare),same=true,myself=this;each(spaces,function(_,space){var isCache=is[space.cache],localCache;if(isCache){localCache=myself[space.cache]||space.to&&space.to(myself._rgba)||[];each(space.props,function(_,prop){if(isCache[prop.idx]!=null){same=(isCache[prop.idx]==localCache[prop.idx]);return same;}});}
	return same;});return same;},_space:function(){var used=[],inst=this;each(spaces,function(spaceName,space){if(inst[space.cache]){used.push(spaceName);}});return used.pop();},transition:function(other,distance){var end=color(other),spaceName=end._space(),space=spaces[spaceName],start=this[space.cache]||space.to(this._rgba),result=start.slice();end=end[space.cache];each(space.props,function(key,prop){var index=prop.idx,startValue=start[index],endValue=end[index],type=propTypes[prop.type]||{};if(endValue===null){return;}
	if(startValue===null){result[index]=endValue;}else{if(type.mod){if(endValue-startValue>type.mod/2){startValue+=type.mod;}else if(startValue-endValue>type.mod/2){startValue-=type.mod;}}
	result[prop.idx]=clamp((endValue-startValue)*distance+startValue,prop);}});return this[spaceName](result);},blend:function(opaque){if(this._rgba[3]===1){return this;}
	var rgb=this._rgba.slice(),a=rgb.pop(),blend=color(opaque)._rgba;return color(jQuery.map(rgb,function(v,i){return(1-a)*blend[i]+a*v;}));},toRgbaString:function(){var prefix="rgba(",rgba=jQuery.map(this._rgba,function(v,i){return v==null?(i>2?1:0):v;});if(rgba[3]===1){rgba.pop();prefix="rgb(";}
	return prefix+rgba.join(",")+")";},toHslaString:function(){var prefix="hsla(",hsla=jQuery.map(this.hsla(),function(v,i){if(v==null){v=i>2?1:0;}
	if(i&&i<3){v=Math.round(v*100)+"%";}
	return v;});if(hsla[3]==1){hsla.pop();prefix="hsl(";}
	return prefix+hsla.join(",")+")";},toHexString:function(includeAlpha){var rgba=this._rgba.slice(),alpha=rgba.pop();if(includeAlpha){rgba.push(~~(alpha*255));}
	return"#"+jQuery.map(rgba,function(v,i){v=(v||0).toString(16);return v.length==1?"0"+v:v;}).join("");},toString:function(){return this._rgba[3]===0?"transparent":this.toRgbaString();}};color.fn.parse.prototype=color.fn;function hue2rgb(p,q,h){h=(h+1)%1;if(h*6<1){return p+(q-p)*6*h;}
	if(h*2<1){return q;}
	if(h*3<2){return p+(q-p)*((2/3)-h)*6;}
	return p;}
	spaces.hsla.to=function(rgba){if(rgba[0]==null||rgba[1]==null||rgba[2]==null){return[null,null,null,rgba[3]];}
	var r=rgba[0]/255,g=rgba[1]/255,b=rgba[2]/255,a=rgba[3],max=Math.max(r,g,b),min=Math.min(r,g,b),diff=max-min,add=max+min,l=add*0.5,h,s;if(min===max){h=0;}else if(r===max){h=(60*(g-b)/diff)+360;}else if(g===max){h=(60*(b-r)/diff)+120;}else{h=(60*(r-g)/diff)+240;}
	if(l===0||l===1){s=l;}else if(l<=0.5){s=diff/add;}else{s=diff/(2-add);}
	return[Math.round(h)%360,s,l,a==null?1:a];};spaces.hsla.from=function(hsla){if(hsla[0]==null||hsla[1]==null||hsla[2]==null){return[null,null,null,hsla[3]];}
	var h=hsla[0]/360,s=hsla[1],l=hsla[2],a=hsla[3],q=l<=0.5?l*(1+s):l+s-l*s,p=2*l-q,r,g,b;return[Math.round(hue2rgb(p,q,h+(1/3))*255),Math.round(hue2rgb(p,q,h)*255),Math.round(hue2rgb(p,q,h-(1/3))*255),a];};each(spaces,function(spaceName,space){var props=space.props,cache=space.cache,to=space.to,from=space.from;color.fn[spaceName]=function(value){if(to&&!this[cache]){this[cache]=to(this._rgba);}
	if(value===undefined){return this[cache].slice();}
	var type=jQuery.type(value),arr=(type==="array"||type==="object")?value:arguments,local=this[cache].slice(),ret;each(props,function(key,prop){var val=arr[type==="object"?key:prop.idx];if(val==null){val=local[prop.idx];}
	local[prop.idx]=clamp(val,prop);});if(from){ret=color(from(local));ret[cache]=local;return ret;}else{return color(local);}};each(props,function(key,prop){if(color.fn[key]){return;}
	color.fn[key]=function(value){var vtype=jQuery.type(value),fn=(key==='alpha'?(this._hsla?'hsla':'rgba'):spaceName),local=this[fn](),cur=local[prop.idx],match;if(vtype==="undefined"){return cur;}
	if(vtype==="function"){value=value.call(this,cur);vtype=jQuery.type(value);}
	if(value==null&&prop.empty){return this;}
	if(vtype==="string"){match=rplusequals.exec(value);if(match){value=cur+parseFloat(match[2])*(match[1]==="+"?1:-1);}}
	local[prop.idx]=value;return this[fn](local);};});});each(stepHooks,function(i,hook){jQuery.cssHooks[hook]={set:function(elem,value){value=color(value);if(!support.rgba&&value._rgba[3]!==1){var backgroundColor,curElem=hook==="backgroundColor"?elem.parentNode:elem;do{backgroundColor=jQuery.curCSS(curElem,"backgroundColor");}while((backgroundColor===""||backgroundColor==="transparent")&&(curElem=curElem.parentNode)&&curElem.style);value=value.blend(backgroundColor&&backgroundColor!=="transparent"?backgroundColor:"_default");}
	value=value.toRgbaString();elem.style[hook]=value;}};jQuery.fx.step[hook]=function(fx){if(!fx.colorInit){fx.start=color(fx.elem,hook);fx.end=color(fx.end);fx.colorInit=true;}
	jQuery.cssHooks[hook].set(fx.elem,fx.start.transition(fx.end,fx.pos));};});jQuery(function(){var div=document.createElement("div"),div_style=div.style;div_style.cssText="background-color:rgba(1,1,1,.5)";support.rgba=div_style.backgroundColor.indexOf("rgba")>-1;});colors=jQuery.Color.names={aqua:"#00ffff",azure:"#f0ffff",beige:"#f5f5dc",black:"#000000",blue:"#0000ff",brown:"#a52a2a",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgrey:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkviolet:"#9400d3",fuchsia:"#ff00ff",gold:"#ffd700",green:"#008000",indigo:"#4b0082",khaki:"#f0e68c",lightblue:"#add8e6",lightcyan:"#e0ffff",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightyellow:"#ffffe0",lime:"#00ff00",magenta:"#ff00ff",maroon:"#800000",navy:"#000080",olive:"#808000",orange:"#ffa500",pink:"#ffc0cb",purple:"#800080",violet:"#800080",red:"#ff0000",silver:"#c0c0c0",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"};})(jQuery);
})( jQuery );
// json2 by Douglas Crockford
// https://github.com/douglascrockford/JSON-js
var JSON;
if (!JSON) {
	JSON = {}
}(function() {
	function str(a, b) {
		var c, d, e, f, g = gap,
			h, i = b[a];
		if (i && typeof i === "object" && typeof i.toJSON === "function") {
			i = i.toJSON(a)
		}
		if (typeof rep === "function") {
			i = rep.call(b, a, i)
		}
		switch (typeof i) {
		case "string":
			return quote(i);
		case "number":
			return isFinite(i) ? String(i) : "null";
		case "boolean":
		case "null":
			return String(i);
		case "object":
			if (!i) {
				return "null"
			}
			gap += indent;
			h = [];
			if (Object.prototype.toString.apply(i) === "[object Array]") {
				f = i.length;
				for (c = 0; c < f; c += 1) {
					h[c] = str(c, i) || "null"
				}
				e = h.length === 0 ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]";
				gap = g;
				return e
			}
			if (rep && typeof rep === "object") {
				f = rep.length;
				for (c = 0; c < f; c += 1) {
					if (typeof rep[c] === "string") {
						d = rep[c];
						e = str(d, i);
						if (e) {
							h.push(quote(d) + (gap ? ": " : ":") + e)
						}
					}
				}
			} else {
				for (d in i) {
					if (Object.prototype.hasOwnProperty.call(i, d)) {
						e = str(d, i);
						if (e) {
							h.push(quote(d) + (gap ? ": " : ":") + e)
						}
					}
				}
			}
			e = h.length === 0 ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}";
			gap = g;
			return e
		}
	}
	function quote(a) {
		escapable.lastIndex = 0;
		return escapable.test(a) ? '"' + a.replace(escapable, function(a) {
			var b = meta[a];
			return typeof b === "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' : '"' + a + '"'
	}
	function f(a) {
		return a < 10 ? "0" + a : a
	}
	"use strict";
	if (typeof Date.prototype.toJSON !== "function") {
		Date.prototype.toJSON = function(a) {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
		};
		String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(a) {
			return this.valueOf()
		}
	}
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		gap, indent, meta = {
			"\b": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\f": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		},
		rep;
	if (typeof JSON.stringify !== "function") {
		JSON.stringify = function(a, b, c) {
			var d;
			gap = "";
			indent = "";
			if (typeof c === "number") {
				for (d = 0; d < c; d += 1) {
					indent += " "
				}
			} else if (typeof c === "string") {
				indent = c
			}
			rep = b;
			if (b && typeof b !== "function" && (typeof b !== "object" || typeof b.length !== "number")) {
				throw new Error("JSON.stringify")
			}
			return str("", {
				"": a
			})
		}
	}
	if (typeof JSON.parse !== "function") {
		JSON.parse = function(text, reviver) {
			function walk(a, b) {
				var c, d, e = a[b];
				if (e && typeof e === "object") {
					for (c in e) {
						if (Object.prototype.hasOwnProperty.call(e, c)) {
							d = walk(e, c);
							if (d !== undefined) {
								e[c] = d
							} else {
								delete e[c]
							}
						}
					}
				}
				return reviver.call(a, b, e)
			}
			var j;
			text = String(text);
			cx.lastIndex = 0;
			if (cx.test(text)) {
				text = text.replace(cx, function(a) {
					return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
				})
			}
			if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
				j = eval("(" + text + ")");
				return typeof reviver === "function" ? walk({
					"": j
				}, "") : j
			}
			throw new SyntaxError("JSON.parse")
		}
	}
})();

// mustache.js templating - http://mustache.github.com/
var Mustache = function() {
		var a = function() {};
		a.prototype = {
			otag: "{{",
			ctag: "}}",
			pragmas: {},
			buffer: [],
			pragmas_implemented: {
				"IMPLICIT-ITERATOR": true
			},
			context: {},
			render: function(e, d, c, f) {
				if (!f) {
					this.context = d;
					this.buffer = []
				}
				if (!this.includes("", e)) {
					if (f) {
						return e
					} else {
						this.send(e);
						return
					}
				}
				e = this.render_pragmas(e);
				var b = this.render_section(e, d, c);
				if (f) {
					return this.render_tags(b, d, c, f)
				}
				this.render_tags(b, d, c, f)
			},
			send: function(b) {
				if (b != "") {
					this.buffer.push(b)
				}
			},
			render_pragmas: function(b) {
				if (!this.includes("%", b)) {
					return b
				}
				var d = this;
				var c = new RegExp(this.otag + "%([\\w-]+) ?([\\w]+=[\\w]+)?" + this.ctag);
				return b.replace(c, function(g, e, f) {
					if (!d.pragmas_implemented[e]) {
						throw ({
							message: "This implementation of mustache doesn't understand the '" + e + "' pragma"
						})
					}
					d.pragmas[e] = {};
					if (f) {
						var h = f.split("=");
						d.pragmas[e][h[0]] = h[1]
					}
					return ""
				})
			},
			render_partial: function(b, d, c) {
				b = this.trim(b);
				if (!c || c[b] === undefined) {
					throw ({
						message: "unknown_partial '" + b + "'"
					})
				}
				if (typeof(d[b]) != "object") {
					return this.render(c[b], d, c, true)
				}
				return this.render(c[b], d[b], c, true)
			},
			render_section: function(d, c, b) {
				if (!this.includes("#", d) && !this.includes("^", d)) {
					return d
				}
				var f = this;
				var e = new RegExp(this.otag + "(\\^|\\#)\\s*(.+)\\s*" + this.ctag + "\n*([\\s\\S]+?)" + this.otag + "\\/\\s*\\2\\s*" + this.ctag + "\\s*", "mg");
				return d.replace(e, function(h, i, g, j) {
					var k = f.find(g, c);
					if (i == "^") {
						if (!k || f.is_array(k) && k.length === 0) {
							return f.render(j, c, b, true)
						} else {
							return ""
						}
					} else {
						if (i == "#") {
							if (f.is_array(k)) {
								return f.map(k, function(l) {
									return f.render(j, f.create_context(l), b, true)
								}).join("")
							} else {
								if (f.is_object(k)) {
									return f.render(j, f.create_context(k), b, true)
								} else {
									if (typeof k === "function") {
										return k.call(c, j, function(l) {
											return f.render(l, c, b, true)
										})
									} else {
										if (k) {
											return f.render(j, c, b, true)
										} else {
											return ""
										}
									}
								}
							}
						}
					}
				})
			},
			render_tags: function(k, b, d, f) {
				var e = this;
				var j = function() {
						return new RegExp(e.otag + "(=|!|>|\\{|%)?([^\\/#\\^]+?)\\1?" + e.ctag + "+", "g")
					};
				var g = j();
				var h = function(n, i, m) {
						switch (i) {
						case "!":
							return "";
						case "=":
							e.set_delimiters(m);
							g = j();
							return "";
						case ">":
							return e.render_partial(m, b, d);
						case "{":
							return e.find(m, b);
						default:
							return e.escape(e.find(m, b))
						}
					};
				var l = k.split("\n");
				for (var c = 0; c < l.length; c++) {
					l[c] = l[c].replace(g, h, this);
					if (!f) {
						this.send(l[c])
					}
				}
				if (f) {
					return l.join("\n")
				}
			},
			set_delimiters: function(c) {
				var b = c.split(" ");
				this.otag = this.escape_regex(b[0]);
				this.ctag = this.escape_regex(b[1])
			},
			escape_regex: function(c) {
				if (!arguments.callee.sRE) {
					var b = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"];
					arguments.callee.sRE = new RegExp("(\\" + b.join("|\\") + ")", "g")
				}
				return c.replace(arguments.callee.sRE, "\\$1")
			},
			find: function(c, d) {
				c = this.trim(c);

				function b(f) {
					return f === false || f === 0 || f
				}
				var e;
				if (b(d[c])) {
					e = d[c]
				} else {
					if (b(this.context[c])) {
						e = this.context[c]
					}
				}
				if (typeof e === "function") {
					return e.apply(d)
				}
				if (e !== undefined) {
					return e
				}
				return ""
			},
			includes: function(c, b) {
				return b.indexOf(this.otag + c) != -1
			},
			escape: function(b) {
				b = String(b === null ? "" : b);
				return b.replace(/&(?!\w+;)|["<>\\]/g, function(c) {
					switch (c) {
					case "&":
						return "&amp;";
					case "\\":
						return "\\\\";
					case '"':
						return '"';
					case "<":
						return "&lt;";
					case ">":
						return "&gt;";
					default:
						return c
					}
				})
			},
			create_context: function(c) {
				if (this.is_object(c)) {
					return c
				} else {
					var d = ".";
					if (this.pragmas["IMPLICIT-ITERATOR"]) {
						d = this.pragmas["IMPLICIT-ITERATOR"].iterator
					}
					var b = {};
					b[d] = c;
					return b
				}
			},
			is_object: function(b) {
				return b && typeof b == "object"
			},
			is_array: function(b) {
				return Object.prototype.toString.call(b) === "[object Array]"
			},
			trim: function(b) {
				return b.replace(/^\s*|\s*$/g, "")
			},
			map: function(f, d) {
				if (typeof f.map == "function") {
					return f.map(d)
				} else {
					var e = [];
					var b = f.length;
					for (var c = 0; c < b; c++) {
						e.push(d(f[c]))
					}
					return e
				}
			}
		};
		return ({
			name: "mustache.js",
			version: "0.3.1-dev",
			to_html: function(d, b, c, f) {
				var e = new a();
				if (f) {
					e.send = f
				}
				e.render(d, b, c);
				if (!f) {
					return e.buffer.join("\n")
				}
			}
		})
	}();

// StyleFix 1.0.1 & PrefixFree 1.0.4 / by Lea Verou / MIT license
(function() {
	function h(a, b) {
		return [].slice.call((b || document).querySelectorAll(a))
	}
	if (window.addEventListener) {
		var b = window.StyleFix = {
			link: function(a) {
				try {
					if (!/\bstylesheet\b/i.test(a.rel) || !a.sheet.cssRules) return
				} catch (c) {
					return
				}
				var d = a.href || a.getAttribute("data-href"),
					f = d.replace(/[^\/]+$/, ""),
					g = a.parentNode,
					e = new XMLHttpRequest;
				e.open("GET", d);
				e.onreadystatechange = function() {
					if (4 === e.readyState) {
						var c = e.responseText;
						if (c && a.parentNode) {
							c = b.fix(c, !0, a);
							f && (c = c.replace(/url\((?:'|")?(.+?)(?:'|")?\)/gi, function(a, c) {
								return !/^([a-z]{3,10}:|\/|#)/i.test(c) ? 'url("' + f + c + '")' : a
							}), c = c.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)" + f, "gi"), "$1"));
							var d = document.createElement("style");
							d.textContent = c;
							d.media = a.media;
							d.disabled = a.disabled;
							d.setAttribute("data-href", a.getAttribute("href"));
							g.insertBefore(d, a);
							g.removeChild(a)
						}
					}
				};
				e.send(null);
				a.setAttribute("data-inprogress", "")
			},
			styleElement: function(a) {
				var c = a.disabled;
				a.textContent = b.fix(a.textContent, !0, a);
				a.disabled = c
			},
			styleAttribute: function(a) {
				var c = a.getAttribute("style"),
					c = b.fix(c, !1, a);
				a.setAttribute("style", c)
			},
			process: function() {
				h('link[rel~="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);
				h("style").forEach(StyleFix.styleElement);
				h("[style]").forEach(StyleFix.styleAttribute)
			},
			register: function(a, c) {
				(b.fixers = b.fixers || []).splice(void 0 === c ? b.fixers.length : c, 0, a)
			},
			fix: function(a, c) {
				for (var d = 0; d < b.fixers.length; d++) a = b.fixers[d](a, c) || a;
				return a
			},
			camelCase: function(a) {
				return a.replace(/-([a-z])/g, function(a, b) {
					return b.toUpperCase()
				}).replace("-", "")
			},
			deCamelCase: function(a) {
				return a.replace(/[A-Z]/g, function(a) {
					return "-" + a.toLowerCase()
				})
			}
		};
		(function() {
			setTimeout(function() {
				h('link[rel~="stylesheet"]').forEach(StyleFix.link)
			}, 10);
			document.addEventListener("DOMContentLoaded", StyleFix.process, !1)
		})()
	}
})();
(function(h) {
	if (window.StyleFix && window.getComputedStyle) {
		var b = window.PrefixFree = {
			prefixCSS: function(a, c) {
				function d(c, d, f, g) {
					c = b[c];
					c.length && (c = RegExp(d + "(" + c.join("|") + ")" + f, "gi"), a = a.replace(c, g))
				}
				var f = b.prefix;
				d("functions", "(\\s|:|,)", "\\s*\\(", "$1" + f + "$2(");
				d("keywords", "(\\s|:)", "(\\s|;|\\}|$)", "$1" + f + "$2$3");
				d("properties", "(^|\\{|\\s|;)", "\\s*:", "$1" + f + "$2:");
				if (b.properties.length) {
					var g = RegExp("\\b(" + b.properties.join("|") + ")(?!:)", "gi");
					d("valueProperties", "\\b", ":(.+?);", function(a) {
						return a.replace(g, f + "$1")
					})
				}
				c && (d("selectors", "", "\\b", b.prefixSelector), d("atrules", "@", "\\b", "@" + f + "$1"));
				return a = a.replace(RegExp("-" + f, "g"), "-")
			},
			prefixSelector: function(a) {
				return a.replace(/^:{1,2}/, function(a) {
					return a + b.prefix
				})
			},
			prefixProperty: function(a, c) {
				var d = b.prefix + a;
				return c ? StyleFix.camelCase(d) : d
			}
		};
		(function() {
			var a = {},
				c = [],
				d = getComputedStyle(document.documentElement, null),
				f = document.createElement("div").style,
				g = function(b) {
					if ("-" === b.charAt(0)) {
						c.push(b);
						var b = b.split("-"),
							d = b[1];
						for (a[d] = ++a[d] || 1; 3 < b.length;) b.pop(), d = b.join("-"), StyleFix.camelCase(d) in f && -1 === c.indexOf(d) && c.push(d)
					}
				};
			if (0 < d.length) for (var e = 0; e < d.length; e++) g(d[e]);
			else for (var i in d) g(StyleFix.deCamelCase(i));
			var e = 0,
				j, h;
			for (h in a) d = a[h], e < d && (j = h, e = d);
			b.prefix = "-" + j + "-";
			b.Prefix = StyleFix.camelCase(b.prefix);
			b.properties = [];
			for (e = 0; e < c.length; e++) i = c[e], 0 === i.indexOf(b.prefix) && (j = i.slice(b.prefix.length), StyleFix.camelCase(j) in f || b.properties.push(j));
			"Ms" == b.Prefix && !("transform" in f) && !("MsTransform" in f) && "msTransform" in f && b.properties.push("transform", "transform-origin");
			b.properties.sort()
		})();
		(function() {
			function a(a, b) {
				f[b] = "";
				f[b] = a;
				return !!f[b]
			}
			var c = {
				"linear-gradient": {
					property: "backgroundImage",
					params: "red, teal"
				},
				calc: {
					property: "width",
					params: "1px + 5%"
				},
				element: {
					property: "backgroundImage",
					params: "#foo"
				}
			};
			c["repeating-linear-gradient"] = c["repeating-radial-gradient"] = c["radial-gradient"] = c["linear-gradient"];
			var d = {
				initial: "color",
				"zoom-in": "cursor",
				"zoom-out": "cursor",
				box: "display",
				flexbox: "display",
				"inline-flexbox": "display"
			};
			b.functions = [];
			b.keywords = [];
			var f = document.createElement("div").style,
				g;
			for (g in c) {
				var e = c[g],
					i = e.property,
					e = g + "(" + e.params + ")";
				!a(e, i) && a(b.prefix + e, i) && b.functions.push(g)
			}
			for (var h in d) i = d[h], !a(h, i) && a(b.prefix + h, i) && b.keywords.push(h)
		})();
		(function() {
			function a(a) {
				f.textContent = a + "{}";
				return !!f.sheet.cssRules.length
			}
			var c = {
				":read-only": null,
				":read-write": null,
				":any-link": null,
				"::selection": null
			},
				d = {
					keyframes: "name",
					viewport: null,
					document: 'regexp(".")'
				};
			b.selectors = [];
			b.atrules = [];
			var f = h.appendChild(document.createElement("style")),
				g;
			for (g in c) {
				var e = g + (c[g] ? "(" + c[g] + ")" : "");
				!a(e) && a(b.prefixSelector(e)) && b.selectors.push(g)
			}
			for (var i in d) e = i + " " + (d[i] || ""), !a("@" + e) && a("@" + b.prefix + e) && b.atrules.push(i);
			h.removeChild(f)
		})();
		b.valueProperties = ["transition", "transition-property"];
		h.className += " " + b.prefix;
		StyleFix.register(b.prefixCSS)
	}
})(document.documentElement);

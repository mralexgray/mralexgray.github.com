---
layout: post
title: "Jekyll Syntax Highlighting"
description: ""
category:
tags: [jekyll bootstrap github-pages syntax]
---
{% include JB/setup %}


---
layout: default
title: Something with codes
---

Happy fun highlighting.
[More details](https://github.com/mojombo/jekyll/wiki/liquid-extensions)

{% highlight ruby %}
def foo
  puts 'foo'
end
{% endhighlight %}



source:
http://stackoverflow.com/questions/6615415/add-syntax-highlighting-to-gh-pages


Code Highlighting

Jekyll has built in support for syntax highlighting of over 100 languages via Pygments. In order to take advantage of this you’ll need to have Pygments installed, and the pygmentize binary must be in your path. When you run Jekyll, make sure you run it with Pygments support

To denote a code block that should be highlighted:

{% highlight ruby %}
def foo
  puts 'foo'
end
{% endhighlight %}
The argument to highlight is the language identifier. To find the appropriate identifier to use for your favorite language, look for the “short name” on the [Lexers page](http://pygments.org/docs/lexers/).

Line number

There is a second argument to highlight called linenos that is optional. Including the linenos argument will force the highlighted code to include line numbers. For instance, the following code block would include line numbers next to each line:

{% highlight ruby linenos %}
def foo
  puts 'foo'
end
{% endhighlight %}
In order for the highlighting to show up, you’ll need to include a highlighting stylesheet. For an example stylesheet you [can look at syntax.css](http://github.com/mojombo/tpw/tree/master/css/syntax.css). These are the same styles as used by GitHub and you are free to use them for your own site. If you use linenos, you might want to include an additional CSS class definition for lineno in syntax.css to distinguish the line numbers from the highlighted code.

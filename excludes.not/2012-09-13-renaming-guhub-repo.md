---
layout: post
title: "renaming guhub repo"
description: ""
category:
tags: []
---
{% include JB/setup %}


Rename, then...

Now the problem is that your git repository is still pointing to the old name and a git push will fail. A remote repository in git terms is called remote. So the first thing to do is remove the old remote:

{% highlight sh %}
git remote rm origin
git remote -v
{% endhighlight %}

The second line lists all available remotes and shouldn’t give any output if the “origin” was your only remote. Now you can add the new remote origin:

{% highlight sh %}
git remote add origin git@github.com:username/projectname.git
git remote -v
{% endhighlight %}

Where username and projectname have to be replaced with the corresponding values. At this point git push will work.

By the way, even with the broken remote all other commands were still working, I could still diff against any version, check the status and commit. All this changes are recorded to the local repository and will be sent to the remote server at the first successful push.

source: (Renaming a project in github) [http://www.stefanolocati.it/blog/?p=935]

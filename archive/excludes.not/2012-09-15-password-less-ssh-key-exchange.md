---
layout: post
title: "Password less SSH key exchange"
description: ""
category:
tags: [ssh security brevity iPad file-sharing]
---
{% include JB/setup %}


Every time I have to do this, I forget the proper commands that I have to, resulting in an obnoxious Google search, always having forgotten which is the best answer on how to do it, etc, blah, blah, blah. So here is the canonical way of generating the keypair for passwordless ssh logins.

Source
When you're an admin on more than a few machines, being able to navigate quickly to a shell on any given server is critical. Having to type "ssh my.server.com" (followed by a password) is not only tedious, but it breaks one's concentration. Suddenly having to shift from "where's the problem?" to "getting there" and back to "what's all this, then?" has led more than one admin to premature senility. It promotes the digital equivalent of "why did I come into this room, anyway?" (In addition, the problem is only made worse by /usr/games/fortune!)

At any rate, more effort spent logging into a machine means less effort spent solving problems. Recent versions of ssh offer a secure alternative to endlessly entering a password: public key exchange.

To use public keys with an ssh server, you'll first need to generate a public/private key pair:

{% sh %}
ssh-keygen -t rsa
{% endhighlight %}

You can also use -t dsa for DSA keys, or -t rsa1 if you're using Protocol v1. (And shame on you if you are! Upgrade to v2 as soon as you can!)

After you enter the above command, you should see something like this:

Generating public/private rsa key pair.
Enter file in which to save the key (/home/rob/.ssh/id_rsa):
Just hit Enter there. It will then ask you for a pass phrase; just hit enter twice (but read the Security note below). Here's what the results should look like:

{% sh %}
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/rob/.ssh/id_rsa.
Your public key has been saved in /home/rob/.ssh/id_rsa.pub.
The key fingerprint is:
a6:5c:c3:eb:18:94:0b:06:a1:a6:29:58:fa:80:0a:bc rob@localhost
This created two files, ~/.ssh/id_rsa and ~/.ssh/id_rsa.pub. To use this keypair on a server, try this:
{% endhighlight %}

{% sh %}
ssh server "mkdir .ssh; chmod 0700 .ssh"
scp .ssh/id_rsa.pub server:.ssh/authorized_keys2
{% endhighlight %}

Of course, substitute your server name for server. It should ask for your password both times. Now, simply ssh server and it should log you in automagically without a password. And yes, it will use your shiny new public key for scp, too.

If that didn't work for you, check your file permissions on both ~/.ssh/* and server:~/.ssh/*. Your private key (id_rsa) should be 0600 (and only be present on your local machine), and everything else should be 0655 or better.

\[Password less SSH key exchange\]({% post_url 2012-09-15-password-less-ssh-key-exchange %})

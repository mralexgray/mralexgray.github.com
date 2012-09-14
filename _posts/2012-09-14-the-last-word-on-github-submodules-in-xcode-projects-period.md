---
layout: post
title: "The last word on github submodules in Xcode projects. Period."
description: ""
category:
tags: [xcode github git submodules open-source repositories syntax]
---
{% include JB/setup %}



In terminal navigate to the root of your project directory and run these commands (assuming your project is a git repo):

git submodule add git://github.com/ShareKit/ShareKit.git Submodules/ShareKit
git commit -m 'ShareKit added as submodule'
This creates new submodule, downloads the files to Submodules/ShareKit directory within your project and creates new commit with updated git repo settings.

Now navigate to the newly created ShareKit dir and download all submodules files

cd Submodules/ShareKit
git submodule update --init --recursive

source ShareKit

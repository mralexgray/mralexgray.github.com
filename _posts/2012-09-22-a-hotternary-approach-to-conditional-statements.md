---
layout: post
title: "A Hot/Ternary Approach to Conditional Statements"
description: ""
category:
tags: []
---
{% include JB/setup %}


- (void)toggleStateDidChangeTo:(BOOL)state InToggleViewArray:(AZToggleArrayView *) view WithName:(NSString *)name{
	NSDictionary *action = @{

	@"toggle0" : ^{	self.orient = _orient == AZOrientGrid ? AZOrientPerimeter : AZOrientGrid; [_content shuffle]; 			},
	@"toggle1" : ^{	[_content do:^(AZGridTransformCell* obj) {	state ? [obj.front fadeOut] : [obj.front fadeIn]; 	}];		},
	@"toggle2" : ^{	[_content do:^(AZGridTransformCell* obj) { 	state ? [obj.back fadeOut] : [obj.back fadeIn];  	}];		},
	@"toggle4" : ^{	[_content do:^(AZGridTransformCell* obj) {	obj.hidden = obj.hidden ? NO : YES;					}]; 	} 	};
	((void (^)()) [action objectForKey:name] )();		[_root setNeedsLayout];
}


- (void)observeValueForKeyPath:(NSString *)keyPath 	 ofObject:(id)object
						change:(NSDictionary *)change context:(void *)context
{
	id selectedOrClockwise = ^{
		[self setNeedsDisplay:YES];
		[_circleLayer setNeedsDisplay];
		[self startAnimationForLayer:_circleLayer];

	};
	id defaultAction =	^{ [super observeValueForKeyPath:keyPath ofObject:object change:change context:context]; };

	NSDictionary *action = @{ 	@"selectedItem"	: selectedOrClockwise,
								@"clockwise"	: selectedOrClockwise };
	((void (^)()) ([action objectForKey:keyPath] ? [action objectForKey:keyPath] : defaultAction) )();

//	([keyPath isEqual:@"selectedItem"] || [keyPath isEqual:@"clockwise"])
//	{
}
	__block BOOL yesno = YES;
//	yesno ? NSLog(@"%@", StringFromBOOL(yesno)) : NSLog(@"%@", StringFromBOOL(yesno));
//	yesno ? ^{ yesno =! yesno; NSLog(@"%@", StringFromBOOL(yesno)); }()
//		  : ^{ yesno =! yesno; NSLog(@"HAHA %@", StringFromBOOL(yesno)); }();

	[@[ @"YES", @"NO", @"SIRPOOPSALOT"] do:^(id maybe) {
		[maybe isEqual:@"YES"] ?	 ^{ NSLog(@"You got it!"); }()
	  : [maybe isEqual:@"NO" ] ? ^{ NSLog(@"You lose!!!"); }() : ^{ NSLog(@"Not sure!"); }();
	}];



OLD:  	switch (whichViewTag)	{
		case 0:	// swap in the "CustomImageViewController - NSImageView"
		{			CustomImageViewController* imageViewController =
				[[CustomImageViewController alloc] initWithNibName:kViewTitle bundle:nil];
			if (imageViewController != nil)
			{

				currentVC = imageViewController;	// keep track of the current view controller
				[currentVC setTitle:kViewTitle];
			}
		}	break;
		case 1:	// swap in the "CustomTableViewController - NSTableView"
		{
			CustomTableViewController* tableViewController =
				[[CustomTableViewController alloc] initWithNibName:kTableTitle bundle:nil];
			if (tableViewController != nil)
			{
				currentVC = tableViewController;	// keep track of the current view controller
				[currentVC setTitle:kTableTitle];
			}
			break;
		}

		case 2:	// swap in the "CustomVideoViewController - QTMovieView"
		{
			CustomVideoViewController* videoViewController =
				[[CustomVideoViewController alloc] initWithNibName:kVideoTitle bundle:nil];
			if (videoViewController != nil)
			{
				currentVC = videoViewController;	// keep track of the current view controller
				[currentVC setTitle:kVideoTitle];
			}
			break;
		}



NEW:


	whichViewTag == 0 ? ^{ // swap in the "CustomImageViewController - NSImageView"
		CustomImageViewController* imageViewController =
				[[CustomImageViewController alloc] initWithNibName:kViewTitle bundle:nil];
		imageViewController ? ^{ currentVC = imageViewController;	// keep track of the current view controller
								 [currentVC setTitle:kViewTitle]; }() : nil;
	}() :
	whichViewTag == 1 ? ^{ // swap in the "CustomTableViewController - NSTableView"
		CustomTableViewController* tableViewController = [[CustomTableViewController alloc] initWithNibName:kTableTitle bundle:nil];
		tableViewController ? ^{ 	currentVC = tableViewController;	// keep track of the current view controller
			[currentVC setTitle:kTableTitle]; }() : nil;
	}() :
	whichViewTag == 2 ?	^{// swap in the "CustomVideoViewController - QTMovieView"
		CustomVideoViewController* videoViewController = [[CustomVideoViewController alloc] initWithNibName:kVideoTitle bundle:nil];
		videoViewController ? ^{ 	currentVC = videoViewController;	// keep track of the current view controller
									[currentVC setTitle:kVideoTitle]; }():nil;
	}() :
	whichViewTag == 3 ? ^{	// swap in the "NSViewController - Quartz Composer iSight Camera"
		NSViewController* cameraViewController = [[NSViewController alloc] initWithNibName:kCameraTitle bundle:nil];
		cameraViewController ? ^{	currentVC = cameraViewController;	// keep track of the current view controller
									[currentVC setTitle:kCameraTitle]; }():nil;

	}():nil;


["A Hot/Ternary Approach to Conditional Statements"]({% post_url 2012-09-22-a-hotternary-approach-to-conditional-statements %})


{\rtf1\ansi\ansicpg1252\cocoartf1187
\cocoascreenfonts1{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fnil\fcharset0 AppleSymbols;\f2\fnil\fcharset0 Monaco;
}
{\colortbl;\red255\green255\blue255;\red127\green127\blue127;}
\paperw12240\paperh15840\margl1440\margr1440\vieww31800\viewh16520\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f0\fs50 \cf0 \

\b\fs74 Custom View Implementor\'92s Checklist\

\b0\fs50 WWDC 2010 Session 141, \'93Crafting Custom Cocoa Views\'94\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural
\cf2 Last Update June 8, 2010\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural
\cf0 \
\
Following is a list of essential considerations to keep in mind when crafting your own custom views.  By working through this checklist, you can ensure that your views are functionally complete and integrate well with AppKit and the rest of the system.\
\
Skim the 
\b bolded headings
\b0  for the essential points, and look to the accompanying text for details, explanations, and recommendations.\
\
For more detailed information on the topics summarized here, see the \'93View Programming Guide for Cocoa\'94, \'93Cocoa Event-Handling Guide\'94, \'93Cocoa Drawing Guide\'94, \'93Accessibility Overview\'94, and \'93Accessibility Programming Guidelines for Cocoa\'94.\
\
\
\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f1 \cf0 \uc0\u9744 
\f0\b   Is your view\'92s content Accessible?
\b0 \
\
Make sure your view describes its content meaningfully to the Accessibility system, and that users can interact with its content using assistive applications and technologies.  This makes your view usable by people with visual and other impairments, and, as an added benefit, enables you to perform automated user interface testing using the Accessibility API.\
\
\

\b \

\f1\b0 \uc0\u9744 
\f0\b   Is the text your view displays localized?
\b0 \
\
If your view displays any static text that's specified in code, make provisions for that text to be localized by indirection through a .strings file.  (See the NSBundle method 
\f2 -localizedStringForKey:value:table:
\f0 .)\
\
In cases where you use .nib/.xib files that contain text labels, be sure to provide a localized copy of each .nib/.xib file, for each localization you plan to support.\
\
\
\

\f1 \uc0\u9744 
\f0\b   Should your view be flipped, or unflipped?\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\b0 \cf0 \
If you want your view to be flipped, you must override 
\f2 -isFlipped
\f0  to return 
\f2 YES
\f0 .\
\
Both conventions are fine, but the decision will impact much of your content layout and drawing code, so it\'92s one you\'92ll want to make early on.\
\
A view\'92s flippedness affects the origin and orientation of its interior (bounds) coordinate system, and the interpretation of its subviews\'92 frame origins.  A \'93flipped\'94 view has its bounds origin at the top-left, with its +y axis pointing downward.  An \'93unflipped\'94 view has its bounds origin at the bottom-left, with its +y axis pointing upward.\
\
Choose whichever convention enables you to write simpler code.  Usually, the natural growth direction of your content determines the better choice.\
\
If your view is used as the documentView of an NSScrollVIew, its flippedness also determines pinning behavior (which corner will remain stationary during ScrollView resize).\
\
\
\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f1 \cf0 \uc0\u9744 
\f0\b   Can your view declare itself opaque?\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\b0 \cf0 \
For optimal performance, if your view guarantees to cover its entire bounds rectangle with 100% opaque fill, override 
\f2 -isOpaque
\f0  to return 
\f2 YES
\f0 .  (Your view\'92s alphaValue is irrelevant to this determination, and is taken into account separately by AppKit.)\
\
This is an easy optimization that can greatly improve performance in window-backed mode, as it allows AppKit to skip drawing of content behind your view (including window background fill) that the view would simply paint over entirely.\
\
\
\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f1 \cf0 \uc0\u9744 
\f0\b   Are you drawing correctly and efficiently?\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\b0 \cf0 \
Override 
\f2 -drawRect:
\f0  to draw your content.  Invoke 
\f2 [super drawRect:]
\f0  if you want to inherit drawing done by a superclass.\
\
Your view should always be prepared to redraw its content on demand.  If you do any \'93out-of-band\'94 drawing into your view (such as using 
\f2 -lockFocus
\f0  / draw / 
\f2 -unlockFocus
\f0  techniques during user interaction) you should be able to reproduce the same drawn results when your -drawRect: method is invoked, according to your view\'92s current state.  Out-of-band drawing doesn\'92t work in layer-backed mode, so is generally discouraged in favor of scheduling all your drawing using 
\f2 -setNeedsDisplay\'85
\f0  and 
\f2 -drawRect:
\f0 .\
\
The NSRect parameter that AppKit passes to 
\f2 -drawRect:
\f0  bounds the area you\'92re being asked to draw.  For optimal performance, test objects for intersection with this NSRect before you bother to draw them.  
\f2 NSIntersectsRect()
\f0  and -
\f2 needsToDrawRect:
\f0  are useful for this.\
\
If your content is very expensive to draw, it may be worth testing for intersection with an exact description of the area being drawn.   
\f2 -needsToDrawRect:
\f0  will do this for you, or you can use
\f2  -getRectsBeingDrawn:count:
\f0  to retrieve the list of rectangles being drawn.\
\
If you need to know whether you\'92re being asked to draw for in-window display or printing purposes, you can use 
\f2 [[NSGraphicsContext currentContext] isDrawingToScreen]
\f0 , or NSGraphicsContext\'92s equivalent 
\f2 +currentContextDrawingToScreen
\f0  convenience method.  The AppKit and Quartz drawing APIs are designed to enable you to use the same code for printing and drawing to a screen, but you may in some cases want to customize your drawing as appropriate for the destination.\
\
If you need to pixel-align elements of your content, make sure you perform your rounding/integralization calculations in a pixel-unit coordinate space.  Take advantage of NSView\'92s -convert(Point/Size/Rect)(To/From)Base: methods, added in Mac OS X 10.5, which provide a working space that\'92s appropriate for pixel rounding, independent of whether the view is window-backed or layer-backed:\
\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f2 \cf0 - (NSPoint)convertPointToBase:(NSPoint)aPoint;\
- (NSPoint)convertPointFromBase:(NSPoint)aPoint;\
- (NSSize)convertSizeToBase:(NSSize)aSize;\
- (NSSize)convertSizeFromBase:(NSSize)aSize;\
- (NSRect)convertRectToBase:(NSRect)aRect;\
- (NSRect)convertRectFromBase:(NSRect)aRect;\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f0 \cf0 \
\
\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f1 \cf0 \uc0\u9744 
\f0\b   Do you need to do work just-in-time, right before drawing?\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\b0 \cf0 \
Override 
\f2 -viewWillDraw
\f0  if you need a just-in-time opportunity to do some work (such as content layout computations) before 
\f2 -drawRect:
\f0  is sent to your view.\
\
Always invoke 
\f2 [super viewWillDraw]
\f0  (before, after, or in the middle of doing your work) to allow recursion to your descendant views.\
\
From 
\f2 -viewWillDraw
\f0 , you may add, remove, and resize subviews, and use the 
\f2 -setNeedsDisplay
\f0 \'85 methods to mark additional view areas as needing drawing.\
\
\
\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f1 \cf0 \uc0\u9744 
\f0\b   Do you schedule drawing, instead of demanding immediate display?\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\b0 \cf0 \
Whenever you don\'92t absolutely need immediate redraw of your view\'92s content, schedule display using one of the 
\f2 -setNeedsDisplay\'85
\f0  methods, instead of invoking a 
\f2 -display\'85
\f0  method.  This approach generally improves efficiency, by enabling AppKit to coalesce drawing requests and service the net result when control returns to your app\'92s main runloop.\
\
\
\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f1 \cf0 \uc0\u9744 
\f0\b   Do you mark affected areas for redisplay as needed, when your view\'92s content or state changes?
\b0 \
\
Any property setter or other method that affects what your view draws should mark the affected areas of the view as needing display, so that the needed redraw will be assured to happen and the user will see the update.  @synthesized property setter methods don't furnish this invalidation, so for properties that affect your view's appearance, you should write your own setter methods that perform it.\
\
Use 
\f2 -setNeedsDisplayInRect:
\f0  in preference to 
\f2 -setNeedsDisplay:
\f0 , when doing so may save you significant unnecessary redraw work.\
\
Choose the correct views to invalidate.  In layer-backed mode, each view draws into its own backing store, which may reveal bugs in invalidation code that just happens to work in window-backed mode.  (Invalidating a view that happens to overlap your view no longer causes your view to redraw its content; the cached backing layer content is simply re-composited.)\
\
\
\

\f1 \uc0\u9744 
\f0\b   Does your view handle being resized appropriately?
\b0 \
\
The autoresizing mechanism, as implemented using the autoresizingMask and autoresizesSubviews properties, is adequate for many user interface layout needs, but sometimes you need to perform programmatic layout.\
\
Some views override 
\f2 -setFrameSize:
\f0  to programmatically adjust layout of their subviews or other content (after calling up to 
\f2 [super setFrameSize:]
\f0 ).  This is OK to do.\
\
If you override 
\f2 -resizeSubviewsWithOldSize: 
\f0 and/or 
\f2 -resizeWithOldSuperviewSize:
\f0  instead, you must ensure that autoresizesSubviews is set to YES on the appropriate views, or these messages will never be delivered to your view.\
\
AppKit automatically marks affected window/layer areas as needing display, when your view\'92s frame size changes.  (This has been true since Mac OS X 10.5; prior to that, you needed to explicitly invalidate areas when resizing views programmatically.)\
\
\

\b \

\f1\b0 \uc0\u9744 
\f0\b   Does your view need to respond to being moved to a different superview or window?\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\b0 \cf0 \
This isn\'92t required, but if there\'92s work you want to do in such cases, you can override one or more of 
\f2 -viewWillMoveToWindow:
\f0 , 
\f2 -viewWillMoveToSuperview:
\f0 , 
\f2 -viewDidMoveToSuperview
\f0 , and 
\f2 -viewDidMoveToWindow
\f0 .\
\
Calling up to super is not strictly required when subclassing NSView directly, but is a good general practice for these methods.\
\
\
\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f1 \cf0 \uc0\u9744 
\f0\b   Does your view need to respond to being hidden or unhidden?\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\b0 \cf0 \
Also not required, but if there\'92s work you want to do on becoming hidden or unhidden, you can override one or both of 
\f2 -viewDidHide
\f0  and 
\f2 -viewDidUnhide
\f0 .\
\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f2 \cf0 -setHidden:
\f0  is not a good override point, since your view may become, or cease to be, effectively hidden because an ancestor view received a 
\f2 -setHidden:
\f0  message.\
\
\
\

\f1 \uc0\u9744 
\f0\b   Does your view operate correctly in both window-backed and layer-backed mode?
\b0 \
\
A view can choose to always be layer-backed, by setting its own 
\f2 wantsLayer
\f0  property to 
\f2 YES
\f0 , but a view may also become layer-backed involuntarily, because an ancestor in the view hierarchy has its 
\f2 wantsLayer
\f0  property set to 
\f2 YES
\f0 .  (Layer-backing applies to entire view subtrees.)\
\
Therefore, any view whose usage context you don\'92t entirely control (for example, a view provided for other apps to use as part of a framework) should be made capable of operating both window-backed and layer-backed nowadays.\
\
In many cases -- especially those involving simple, control-like custom views -- no changes will be necessary to accommodate the possibility of running one way or the other.\
\
If you do need to respond to a change in rendering mode, 
\f2 -setLayer:
\f0  is a useful and appropriate override point.  AppKit invokes this method with a non-
\f2 nil
\f0  parameter when assigning your view a backing layer, and invokes it with a 
\f2 nil
\f0  parameter when removing your view\'92s backing layer.\
\

\f2 -setWantsLayer:
\f0  is not a good override point, since your view may become, or cease to be, layer-backed because an ancestor view received a 
\f2 -setWantsLayer:
\f0  message.\
\
\
\

\f1 \uc0\u9744 
\f0\b   Does your view know how to archive and unarchive itself?\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\b0 \cf0 \
If there\'92s any possibility you\'92ll want to put instances of your view class in .xib/.nib files, or if you might want to use archiving to duplicate instances of your view class at runtime, override 
\f2 -encodeWithCoder:
\f0  and 
\f2 -initWithCoder:
\f0  to save and restore your view\'92s persistent state.\
\
Keyed coding has been around since Mac OS X 10.2, and is the preferred norm nowadays.\
\
\
\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f1 \cf0 \uc0\u9744 
\f0\b   Does your view want to receive keyboard events?\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\b0 \cf0 \
If so, override 
\f2 -acceptsFirstResponder
\f0  to return 
\f2 YES
\f0 .\
\
Override 
\f2 -keyDown:
\f0 , and optionally 
\f2 -keyUp:
\f0 , to be notified of ordinary key press and release events.\
\
Override 
\f2 -flagsChanged:
\f0  if you\'92re interested in modifier key press and release events.\
\
Always pass any events you don\'92t handle to 
\f2 super
\f0 , to give another responder the chance to handle them.\
\
\
\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural

\f1 \cf0 \uc0\u9744 
\f0\b   Does your view want to receive mouse events?
\b0 \
\
Almost certainly yes, in which case:\
\
No special action is required to opt into receiving click-related events, although you may want to override 
\f2 -acceptsFirstMouse
\f0  to indicate that a click on your view should always be delivered to it, even if it\'92s the activating click in an inactive window.\
\
Clicks of the main mouse button result in a 
\f2 -mouseDown:
\f0  message, possibly followed by a series of 
\f2 -mouseDragged:
\f0  messages (if the mouse is moved while the button is held), and ending with a 
\f2 -mouseUp:
\f0  message.\
\
As an alternative to separating their mouse click / drag / release handling into separate methods, some views enter a \'93modal tracking loop\'94 on 
\f2 -mouseDown:
\f0 , looping and pulling mouse events off the event queue until the terminating 
\f2 NSLeftMouseUp
\f0  event arrives.\
\
Factoring your mouse tracking logic into separate -mouseDown:, -mouseDragged:, and -mouseUp: messages typically requires that you provide a place to store tracking state that\'92s shared by all of them (usually in the view instance), but is the preferred modern approach, as it prevents other runloop processing from being blocked during handling of the mouse click / drag / release sequence.\
\
For clicks of the secondary mouse button, the sequence is 
\f2 -rightMouseDown:
\f0 , 
\f2 -rightMouseDragged:
\f0 , 
\f2 -rightMouseUp:
\f0 .\
\
For other buttons, the messages to look for are 
\f2 -otherMouseDown:
\f0 , 
\f2 -otherMouseDragged:
\f0 , 
\f2 -otherMouseUp:
\f0 .\
\
If your view wants 
\f2 -mouseMoved:
\f0  events, you must opt its window into receiving them by doing 
\f2 [window setAcceptsMouseMoved:YES]
\f0 .  To avoid unnecessary overhead, this feature is off by default.  Consider using alternative, and generally more efficient, mechanisms such as Tool Tips, Cursor Rects, and Tracking Areas when possible.\
\
\

\f1 \uc0\u9744 
\f0\b   Does your view want to handle trackpad gestures?
\b0 \
\
If so, consider overriding one or more of -beginGestureWithEvent:, 
\f2 -magnifyWithEvent:
\f0 , 
\f2 -rotateWithEvent:
\f0 , 
\f2 -swipeWithEvent:
\f0 , or 
\f2 -endGestureWithEvent:
\f0 .  \
\
Always provide equivalent means to access the same functionality, since not all users have multi-touch trackpads.\
\
You may also want to consider handling arbitrary multi-touch events.\
}
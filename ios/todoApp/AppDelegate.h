#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

//@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
@interface AppDelegate : EXAppDelegateWrapper <UIApplicationDelegate, RCTBridgeDelegate>
@property (nonatomic, strong) UIWindow *window;

@end

原始脚本:
do shell script "/Applications/Chrome72.app/Contents/MacOS/Google\\ Chrome --user-data-dir=/Users/$    USER/Library/Application\\ Support/Google/Chrome72 > /dev/null 2>&1 &"


网上的脚本：
open -na Chrome72 --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security --disable-site-isolation-trials


现在的脚本：
do shell script "open -na Chrome72 --args --user-data-dir=/Users/cyp/Library/Application Support/Google/Chrome72 --disable-web-security --disable-site-isolation-trials"

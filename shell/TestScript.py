#import sys, json

# simple JSON echo script
#for line in sys.stdin:
#  print(json.dumps(json.loads(line)))

import sys
# コマンドライン引数を受け取り
args = sys.argv
# Nodejs からのメッセージを受け取り
var1 = input()
# Nodejsへメッセージを送信
print(var1)
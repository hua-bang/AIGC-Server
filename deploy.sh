# 获取当前脚本的绝对路径
SCRIPT=$(readlink -f "$0")

# 获取当前脚本所在的文件夹
SCRIPTPATH=$(dirname "$SCRIPT")

echo $SCRIPTPATH

cd $SCRIPTPATH

git pull origin master

cd ./server
npm run deploy

echo begin deploy
# testcesium

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```


## Git 命令
``` bash
# clone代码
git clone url

#添加文件
git add  文件.txt

#提交文件
git commit -m "提交描述"

#只提交某个文件
git commit <文件> -m "提交描述"

#覆盖提交
git commit --amend -m "提交描述"

#push到本地版本库  // push全部提交文件
git push origin master   // git push -u origin master  

#查看仓库当前的状态
git status 

#显示日志
git log

#撤销已经add的版本
git reset HEAD 文件名

#将没有add的文件 ，丢弃
git checkout --文件名

#git 更新提交
1、本地暂存
git stash save "保存信息" 

2、远程拉代码
git pull origin

3、命令恢复暂存
git stash pop   //git stash pop stash@{1} 删除第2个

4、整合冲突提交
git commit -a -m "提交信息"

5、推送到远程
git push -u origin master

```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 存在多个 Git 账户该如何拉取代码

## 起因

在早些时候写过一篇[一台电脑该如何配置多个 git 账户](https://blog.csdn.net/bl_ack233/article/details/127921476?spm=1001.2014.3001.5502)

但是如今又遇到另外一种情况，我司旧版云效迁移新版云效，代码仓库也跟着迁移，此时在`ssh`文件下的`config`中新增的密钥会出现重复昵称，也就是`Host`相同

```bash
# aliyvnOld
Host codeup.aliyun.com
HostName codeup.aliyun.com  # 仓库域名
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_yvnxiao  # 你的私钥文件
IdentityAgent none
IdentitiesOnly yes
User 昵称1

# aliyvnNew
Host codeup.aliyun.com
HostName codeup.aliyun.com  # 仓库域名
PreferredAuthentications publickey
IdentityFile ~/.ssh/ssh_yvnxiaoNew  # 你的私钥文件
IdentityAgent none
IdentitiesOnly yes
User 昵称1

# github
Host github.com
HostName github.com  # 仓库域名
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_github # 你的私钥文件
IdentityAgent none
IdentitiesOnly yes
User Found-404

```

## 解决

这种情况下拉取代码会出现没有权限，就是因为重复的`Host`导致的，解决方法也很简单。

在 clone 代码的时候格式是这样的，比如`git@codeup.aliyun.com:xxxx/xxxx/xxxx.git`

其中**codeup.aliyun.com**就对应了 config 中的 Host，只需要将 config 重复的 Host 修改, 然后clone代码的格式修改成：`git@aliyvn:xxxx/xxxx/xxxx.git`即可

```bash
# aliyvnOld
Host codeup.aliyun.com
HostName codeup.aliyun.com  # 仓库域名
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_yvnxiao  # 你的私钥文件
IdentityAgent none
IdentitiesOnly yes
User 昵称1

# aliyvnNew
Host aliyvn
HostName codeup.aliyun.com  # 仓库域名
PreferredAuthentications publickey
IdentityFile ~/.ssh/ssh_yvnxiaoNew  # 你的私钥文件
IdentityAgent none
IdentitiesOnly yes
User 昵称1

# github
Host github.com
HostName github.com  # 仓库域名
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_github # 你的私钥文件
IdentityAgent none
IdentitiesOnly yes
User Found-404

```

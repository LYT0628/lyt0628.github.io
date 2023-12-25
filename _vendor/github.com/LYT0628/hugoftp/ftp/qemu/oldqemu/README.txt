这个文件来自川合秀实先生《三十天自制操作系统》的附件，旧版本可运行的qemu实在难找。
## 运行方法:
1. 现用img文件覆盖fdimage0.bin
2.运行 qemu-win.bat 批处理文件


--- 
## 旧版qemu的运行方式：
```
qemu.exe -L . -m 32 -localtime -std-vga -fda fdimage0.bin
```
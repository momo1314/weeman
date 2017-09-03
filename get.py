#  use python 3
import requests
import re
from bs4 import BeautifulSoup as bs
import string
import os
import urllib.parse
import urllib.request

'''
urllib.error: ContentTooShortError;   URLError;   HTTPError
urllib.parse:   urlparse;   _splitparams;   urlsplit;   urlunparse;   urlunsplit;   urljoin;   urldefrag;
unquote_to_bytes;   unquote;   parse_qs;   parse_qsl;   unquote_plus;   quote;
quote_plus;   quote_from_bytes;   urlencode;   to_bytes;   unwrap;   splittype;   splithost;   splituser;   splitpasswd;
splitport 等；
urllib.request: urlopen; install_opener; urlretrieve; urlcleanup; request_host; build_opener; _parse_proxy; parse_keqv_list; parse_http_list; _safe_gethostbyname; ftperrors; noheaders; getproxies_environment; proxy_bypass_environment; _proxy_bypass_macosx_sysconf; Request
urllib.response: addbase; addclosehook; addinfo;addinfourl;
urllib.robotparser: RobotFileParser
'''


class get:
    header = {
        "user_agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) \
        Chrome/60.0.3112.101 Safari/537.36",
        "Accept-Language": "zh-CN,zh;q=0.8",
    }

    # urllib方式读取网页
    def get_html(self, url):
        # req = urllib.request.Request(url)
        # req.add_header("user_agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) \
        #         Chrome/60.0.3112.101 Safari/537.36")
        # req.add_header("Accept-Language", "zh-CN,zh;q=0.8")
        # s = urllib.request.urlopen(req)
        # data = s.read()
        # return data
        s = requests.get(url, headers=self.header)
        return s

    #  获取url的域名(根节点)
    @staticmethod
    def get_url_name(url):
        proto, rest = urllib.parse.splittype(url)
        res, rest = urllib.parse.splithost(rest)
        res_all = [res, rest]
        print(res_all)
        return res_all
        # f_name = url.split('/')
        # if f_name[-1] == '':
        #     res_all = [f_name[-2]+'/', "index.html"]
        # else:
        #     h_name = url.split(f_name[-1])[0]
        #     h_name = h_name.split("http://")[-1].split("https://")[-1]
        #     res_all = [h_name, f_name[-1]]
        # return res_all

    #  创建目录
    @staticmethod
    def make_dir(url):
        if os.path.exists('./' + url):
            pass
        else:
            try:
                os.mkdir(r'./' + url)
            except:
                os.makedirs(r'./' + url)

    # 把html文件下载下来
    @staticmethod
    def download_html(url, data):
        # 此处可能需要写一下对结尾是否有东西的判断  我自己比较笨...用了字典↓
        # if url[1].split('.')[-1] is not "php" and "html" and "jsp" and "jhtml":
        #     url[1] += '.php'
        if len(re.split('\?', url[1])) != 1:
            url[1] = re.split('\?', url[1])[0]
        with open("./" + url[0] + "/index.html", 'wb') as ff:
            ff.write(data)  # requests方法
            # # 出现问题 : GBK与UTF-8编码问题  详细的可以吧request方法问题的所有注释取消然后注释掉其下的urllib方法
            # ff.write(data)  # urllib方法

    # 创建css和js的目录与文件
    def make_css_js(self, all_href, all_src, url_host, all_url):
        for url in all_href + all_src:
            # try:
            if url == '':
                pass
            else:
                new_url = all_url.split('/')[0] + "//" + url_host[0] + '/' + url
                s = self.get_html(new_url)
                a = s.status_code
                if a != 200:
                    print(data)
                    new_url = all_url.split('/')[0] + "//" + url_host[0] + '/' + url_host[1].split("/")[1] + '/' + url
                    print(new_url)
                else:
                    pass
                # print(new_url)
                if url[0] == "/" and url[1] == "/":
                    s = self.get_html("http:" + url)
                else:
                    s = self.get_html(new_url)
                data = s.content
                # make_dir和 写得不好这里先不用
                f_name = url.split('/')[-1]
                f_name = f_name.split('?')[0]
                dirs = url.split(f_name)[0]
                if os.path.exists('./' + url_host[0] + '/' + dirs):
                    pass
                else:
                    os.makedirs(r'./' + url_host[0] + '/' + dirs)
                with open("./" + url_host[0] + '/' + dirs + f_name, 'wb') as ff:
                    ff.write(data)
                    # except:
                    #     print("emmmm  have some error in this url "+ url + " such as 404 NOT FOUND")

    def run(self):
        #  输入网址
        url = "https://www.security.online-banking.hsbc.com.cn/gsa/SECURITY_LOGON_PAGE"  # 如果后缀为空 不好处理

        # 获取网页数据

        # requests方法
        s = requests.get(url, headers=header)
        data = s.content

        # urllib方法
        # data = get_html(url)
        #  用bs获取Html节点
        data1 = bs(data, "html.parser")
        # head = data1.find_all("head")
        # script = data1.find_all("script")
        #  遍历所有可以加载网页的script 然后筛选需要下载的css/js
        all_src = []
        all_href = []
        for link in data1.find_all("script") + data1.find_all("link") + data1.find_all("img") + data1.find_all(
                "iframe"):
            src = link.get('src')
            href = link.get('href')
            if src is not None:
                # print(src)
                try:
                    #  requests.get(src)   requests方法 有些网页解析不出  套接字有问题
                    urllib.request.urlopen(src)
                except:
                    if src in all_src:
                        pass
                    else:
                        all_src.append(src)

            if href is not None:
                # print(href)
                try:
                    #   requests.get(href)  同上
                    urllib.request.urlopen(href)
                except:
                    if href in all_href:
                        pass
                    else:
                        all_href.append(href)
        print(all_href)
        print(all_src)
        # 保存首页
        url_host = self.get_url_name(url)
        self.make_dir(url_host[0])
        self.download_html(url_host, data)

        # 注2
        # 保存css/js
        self.make_css_js(all_href, all_src, url_host, url)

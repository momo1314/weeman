#  use python 3
import requests
import re
from bs4 import BeautifulSoup as bs
import string
import os
import urllib.parse
import urllib.request
from optparse import OptionParser

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


class get():
    def __init__(self,url):
        self.url = url
        
        self.header = {
            "user_agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) \
            Chrome/60.0.3112.101 Safari/537.36",
            "Accept-Language": "zh-CN,zh;q=0.8",
        }
        self.run()


    def get_html(self,url):
        s = requests.get(url, headers=self.header)
        return s

    @staticmethod
    def get_url_name(self,url):
        proto, rest = urllib.parse.splittype(url)
        res, rest = urllib.parse.splithost(rest)
        res_all = [res, rest]
        print(res_all)
        return res_all
    
    @staticmethod
    def make_dir(self,url):
        if os.path.exists('./' + url):
            pass
        else:
            try:
                os.mkdir(r'./' + url)
            except:
                os.makedirs(r'./' + url)

    @staticmethod
    def download_html(self,url,data):
        if len(re.split('\?', url[1])) != 1:
            url[1] = re.split('\?', url[1])[0]
        with open("./" + url[0] + "/index.html", 'wb') as ff:
            ff.write(data.prettify().encode('utf-8'))  # requests方法

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
        s = requests.get(self.url, headers=self.header)
        data = s.content

        # get dom via bs
        data1 = bs(data, "html.parser")
        # head = data1.find_all("head")
        # script = data1.find_all("script")
        all_src = []
        all_href = []
        for link in data1.find_all("script") + data1.find_all("link") + data1.find_all("img") + data1.find_all(
                "iframe"):
            src = link.get('src')
            href = link.get('href')
            if src is not None:
                # print(src)
                try:
                    urllib.request.urlopen(src)
                except:
                    if src in all_src:
                        pass
                    else:
                        all_src.append(src)

            if href is not None:
                try:
                    urllib.request.urlopen(href)
                except:
                    if href in all_href:
                        pass
                    else:
                        all_href.append(href)
        #print(all_href)
        #print(all_src)
        for tag in data1.find_all("form"):
            tag['method'] = "post"
            tag['action'] = "ref.html"
        url_host = self.get_url_name(self,self.url)
        self.make_dir(self,url_host[0])
        self.download_html(self,url_host, data1)

        self.make_css_js(all_href, all_src, url_host,self.url)

def main():
    parser = OptionParser()
    parser.add_option("-u","--url",dest="url",help="input the website's url")

    (options,args) = parser.parse_args()
    if not options:
        parser.print_help()
        exit()
    else:
        print(options.url)
        template = get(options.url)

if __name__ == '__main__':
    main()


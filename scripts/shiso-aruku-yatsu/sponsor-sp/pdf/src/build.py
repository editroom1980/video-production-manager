"""構成表PDFを作る：map.svg.html を <!--MAP--> に差しこみ、Chromiumで印刷する。"""
import pathlib, subprocess
here = pathlib.Path(__file__).resolve().parent
out = here.parent
chrome = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
svg = (here / "map.svg.html").read_text(encoding="utf-8")
# 先方用は「番組の流れ」の番号が違うので、図の番号を置きかえる
CLIENT_NUMS = [
    ('font-weight="bold" fill="#fff">3</text>', 'font-weight="bold" fill="#fff">1</text>'),
    ('font-weight="bold" fill="#fff">9</text>', 'font-weight="bold" fill="#fff">7</text>'),
    ('font-weight="bold" fill="#fff">11</text>', 'font-weight="bold" fill="#fff">9</text>'),
    ('font-weight="bold" fill="#fff">12</text>', 'font-weight="bold" fill="#fff">10</text>'),
    ('太鼓橋／14 締め', '太鼓橋／11 締め'),
    ('お店（4〜8・10）', 'お店（2〜6・8）'),
    ('3人で北へ歩く', '出演者が北へ歩く'),
]
svg_client = svg
for a, b in CLIENT_NUMS:
    assert a in svg_client, a
    svg_client = svg_client.replace(a, b)
for src, name in [("staff.html", "川本石材商会_構成表_スタッフ用.pdf"), ("client.html", "川本石材商会_撮影のご案内_先方用.pdf")]:
    tmp = here / ("_build_" + src)
    tmp.write_text((here / src).read_text(encoding="utf-8").replace("<!--MAP-->", svg if src == "staff.html" else svg_client), encoding="utf-8")
    subprocess.run([chrome, "--headless", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer",
                    "--allow-file-access-from-files", f"--print-to-pdf={out / name}", tmp.as_uri()],
                   check=True, capture_output=True)
    tmp.unlink()
    print("built", name)

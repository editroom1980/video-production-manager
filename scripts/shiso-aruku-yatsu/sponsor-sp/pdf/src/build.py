"""構成表PDFを作る：HTMLをChromiumで印刷する。"""
import pathlib, subprocess
here = pathlib.Path(__file__).resolve().parent
out = here.parent
chrome = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
for src, name in [("staff.html", "川本石材商会_構成表_スタッフ用.pdf"), ("client.html", "川本石材商会_撮影のご案内_先方用.pdf"), ("matsukou_proposal.html", "松本工務店_番組構成のご提案.pdf"), ("matsukou_ideas.html", "松本工務店_番組づくりのご相談.pdf"), ("matsukou_onepage.html", "松本工務店_番組づくりのご相談_1枚.pdf")]:
    tmp = here / ("_build_" + src)
    tmp.write_text((here / src).read_text(encoding="utf-8"), encoding="utf-8")
    subprocess.run([chrome, "--headless", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer",
                    "--allow-file-access-from-files", f"--print-to-pdf={out / name}", tmp.as_uri()],
                   check=True, capture_output=True)
    tmp.unlink()
    print("built", name)

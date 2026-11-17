from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether

PRIMARY = colors.HexColor("#6d28d9"); PINK = colors.HexColor("#c026d3"); INK = colors.HexColor("#1e1b4b"); GREY = colors.HexColor("#4b5563")
base = ParagraphStyle("b", fontName="Helvetica", fontSize=9.4, leading=13.2, textColor=GREY)
name = ParagraphStyle("n", fontName="Helvetica-Bold", fontSize=26, leading=30, textColor=INK)
role = ParagraphStyle("r", fontName="Helvetica-Bold", fontSize=11.5, leading=15, textColor=PRIMARY)
contact = ParagraphStyle("c", parent=base, fontSize=9, leading=13, textColor=INK)
h = ParagraphStyle("h", fontName="Helvetica-Bold", fontSize=10.5, leading=14, textColor=PRIMARY, spaceBefore=10, spaceAfter=2)
job = ParagraphStyle("j", fontName="Helvetica-Bold", fontSize=10.5, leading=14, textColor=INK)
when = ParagraphStyle("w", parent=base, alignment=2, textColor=PINK, fontName="Helvetica-Bold")
bul = ParagraphStyle("bl", parent=base, leftIndent=11, bulletIndent=1, spaceBefore=1)

def section(t):
    return [Paragraph(t.upper(), h), HRFlowable(width="100%", thickness=0.8, color=colors.HexColor("#ddd6fe"), spaceAfter=5)]

def entry(title, sub, date, bullets=()):
    row = Table([[Paragraph(title, job), Paragraph(date, when)]], colWidths=[120.5*mm, 49*mm], hAlign="LEFT")
    row.setStyle(TableStyle([("VALIGN", (0,0), (-1,-1), "BOTTOM"), ("LEFTPADDING", (0,0), (-1,-1), 0), ("RIGHTPADDING", (0,0), (-1,-1), 0), ("BOTTOMPADDING", (0,0), (-1,-1), 0), ("TOPPADDING", (0,0), (-1,-1), 0)]))
    out = [row, Paragraph(sub, ParagraphStyle("s", parent=base, textColor=PINK, fontName="Helvetica-Oblique"))]
    out += [Paragraph(b, bul, bulletText="•") for b in bullets]
    return [KeepTogether(out), Spacer(1, 5)]

doc = SimpleDocTemplate("Nida_Sajjad_CV.pdf", pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=14*mm, bottomMargin=12*mm,
                        title="Nida Sajjad — CV", author="Nida Sajjad")
s = []
# accent bar
bar = Table([[""]], colWidths=[169.5*mm], hAlign="LEFT", rowHeights=[3])
bar.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,-1), PRIMARY)]))
s += [bar, Spacer(1, 8), Paragraph("Nida Sajjad", name), Paragraph("Software Engineer &nbsp;|&nbsp; Full-Stack &amp; AI Developer &nbsp;|&nbsp; UI/UX Designer", role), Spacer(1, 4)]
s.append(Paragraph(
    'nidasajjad120@gmail.com &nbsp;•&nbsp; +92 326 1213069 &nbsp;•&nbsp; Lahore, Pakistan<br/>'
    '<link href="https://www.linkedin.com/in/nida-sajjad-92681244a/" color="#6d28d9">linkedin.com/in/nida-sajjad-92681244a</link> &nbsp;•&nbsp; '
    '<link href="https://github.com/nida-coder" color="#6d28d9">github.com/nida-coder</link>', contact))

s += section("Profile")
s.append(Paragraph("Software engineer who builds intelligent, user-centric products end to end — from responsive React interfaces and Django back-ends to AI-powered features and polished UI/UX design. "
                   "Currently working as a Frontend Developer, with a background in IT support and testing and hands-on experience in team-based final year project work. "
                   "Keen to grow in QA / testing and in freelance product development.", base))

s += section("Experience")
s += entry("Frontend Developer", "Fast Services", "2025 – Present", ["Developed responsive user interfaces and integrated APIs into production features."])
s += entry("IT Intern", "Dynamics Outfitters", "2024", ["Supported troubleshooting and testing, gaining exposure to how real teams ship and maintain software."])
s += entry("Guest Speaker — AI &amp; Developers", "Community session", "", ["Shared perspectives on how AI is changing the way developers work."])

s += section("Education")
s += entry("BS Software Engineering", "Lahore College for Women University (LCWU)", "", ["Contributed to team-based final year project work."])

s += section("Skills")
sk = [
    ("Frontend &amp; Web", "React.js, JavaScript, HTML5, CSS3, Tailwind CSS, responsive design"),
    ("Backend &amp; Data", "Python, Django, SQL, REST APIs"),
    ("AI &amp; Agents", "AI agent building, LLM / generative-AI integration, prompt design"),
    ("Design", "UI/UX design, Figma, wireframing, prototyping, graphic design &amp; branding"),
    ("Quality", "Testing, troubleshooting, bug reporting"),
]
t = Table([[Paragraph(f"<b>{a}</b>", ParagraphStyle("k", parent=base, textColor=INK)), Paragraph(b, base)] for a, b in sk], colWidths=[34*mm, 135.5*mm], hAlign="LEFT")
t.setStyle(TableStyle([("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 0), ("TOPPADDING", (0,0), (-1,-1), 1.5), ("BOTTOMPADDING", (0,0), (-1,-1), 1.5)]))
s.append(t)

s += section("Selected Projects")
for n, d in [("SocialSphere", "Social platform with real-time feeds."), ("AI Creations", "Workspace of generative-AI tools."),
             ("NeuralLearn", "AI-powered learning assistant."), ("CareNest", "Personal life-management app."),
             ("UI/UX &amp; Graphic Design", "Product design case studies, branding and visual assets."), ("Final Year Project", "Team-built software system (BS Software Engineering).")]:
    s.append(Paragraph(f"<b>{n}</b> — {d}", bul, bulletText="•"))
s.append(Spacer(1, 6))
s.append(Paragraph('Portfolio &amp; more work: <link href="https://github.com/nida-coder" color="#6d28d9">github.com/nida-coder</link>', base))
doc.build(s)

"""Sample campaign artwork for the social media management case studies.

Three models, taken from the three reference case studies. They share a page
template; what differs is the shape of the work inside it:

  deck    a designed presentation. Every board 1400 wide, nine of them in a
          tight 517-572 band, bookended by two near-square key visuals and
          titled by two 1400x212 strips. Calm, systematic, the shortest page.

  scroll  a Behance-style narrative. 1400 wide, twenty-one pieces, almost no
          two the same height, five thin strips used as breathers, one
          1400x1770 portrait as the centrepiece and a run of four identical
          boards. The most work, for the projects worth it.

  feed    the feed itself. A 1920x640 banner, then the square posts as they
          were published, then a story cut. No boards, no dividers, no
          composition - and no extra design work.

Everything is drawn here rather than borrowed, and each file is written at the
exact size of the slot it fills, so the agency's own artwork drops in under the
same name without moving anything on the page.

Run from the project root:  python scripts/generate-social-campaigns.py
"""
import json
import os
from PIL import Image, ImageDraw, ImageFont

F_BOLD = "C:/Windows/Fonts/arialbd.ttf"
F_REG = "C:/Windows/Fonts/arial.ttf"
F_DISP = "C:/Windows/Fonts/bahnschrift.ttf"
F_MONO = "C:/Windows/Fonts/consola.ttf"

OUT_ROOT = "public/work"
MANIFEST = "scripts/social-campaigns.json"


def font(path, size):
    return ImageFont.truetype(path, max(int(size), 8))


def hex_rgb(value):
    return tuple(int(value[i:i + 2], 16) for i in (1, 3, 5))


def mix(a, b, t):
    return tuple(round(x + (y - x) * t) for x, y in zip(hex_rgb(a), hex_rgb(b)))


class Campaign:
    def __init__(self, slug, model, brand, line, deep, accent, tint, kicker, posts):
        self.slug = slug
        self.model = model
        self.brand = brand
        self.line = line
        self.deep = deep        # the dark ground
        self.accent = accent    # the brand colour
        self.tint = tint        # the light ground
        self.ink = deep         # type on light grounds
        self.kicker = kicker    # the campaign name, used on the strips
        self.posts = posts      # (kicker, headline) per post


CAMPAIGNS = [
    Campaign(
        "dr-bishoy-ghabrial-clinic", "scroll", "Dr. Bishoy Ghabrial", "Eye Clinic",
        "#0C1B2A", "#C8973F", "#F3EFE6", "Awareness series",
        [("Lasik", "See the morning\nbefore your alarm"),
         ("Screens", "Your eyes work\na double shift"),
         ("Children", "Half of what they\nmiss is on the board"),
         ("Cataract", "Colour comes back\nin twenty minutes"),
         ("Check-up", "One visit a year\nis the whole plan"),
         ("Night driving", "Glare is a symptom,\nnot a habit"),
         ("Dry eye", "Blink. Then blink\nproperly"),
         ("Booking", "A clinic that runs\non time"),
         ("Glasses", "A prescription is\nnot forever"),
         ("Diabetes", "Your eyes see it\nbefore you feel it"),
         ("Surgery", "Day case. Home\nby the evening"),
         ("Follow-up", "Two visits, then\nwe leave you alone")],
    ),
    Campaign(
        "cairo-scan", "deck", "Cairo Scan", "Specialized Clinics",
        "#0E2E33", "#1C9AA6", "#ECF4F4", "Diagnostics campaign",
        [("Results", "Your scan is ready\nbefore you are home"),
         ("Radiology", "The machine is new.\nSo is the reading"),
         ("Waiting", "An appointment that\nmeans an appointment"),
         ("Coverage", "Six branches, one\npatient file"),
         ("Second opinion", "Bring the film.\nWe will read it again"),
         ("Women's health", "A screening room\nstaffed by women"),
         ("Paediatric", "Children go first.\nAlways"),
         ("Reports", "Written to be read\nby a human"),
         ("Contrast", "Explained before\nit is injected"),
         ("Archive", "Every scan you have\never had, kept"),
         ("Night", "The machine does\nnot close at five"),
         ("Insurance", "Settled at the\ndesk, not later")],
    ),
    Campaign(
        "technoscan", "deck", "Technoscan", "Specialized Clinics",
        "#10233F", "#00B0A6", "#EDF4F6", "Clinic campaign",
        [("MRI", "Ninety minutes that\nanswer the question"),
         ("Access", "Walk in before work.\nOut before nine"),
         ("Accuracy", "Resolution you can\nact on"),
         ("Comfort", "The scan is loud.\nThe room is not"),
         ("Follow-up", "Your history travels\nwith your file"),
         ("Referral", "We talk to your\ndoctor directly"),
         ("Pricing", "The number you are\nquoted is the number"),
         ("Hours", "Open when the pain\nis worst"),
         ("CT", "Seconds in the\nmachine"),
         ("Report time", "Same day, not\nsame week"),
         ("Parking", "Underneath, free"),
         ("Preparation", "What to eat, and\nwhen to stop")],
    ),
    Campaign(
        "solve-clinic", "feed", "SOLVE", "Dental & Laser",
        "#141C2B", "#3DBE8B", "#EFF5F2", "Dental campaign",
        [("Whitening", "One session.\nTwo shades"),
         ("Implants", "A tooth that lasts\nlonger than the gap"),
         ("Laser", "Less drill, less\nof everything else"),
         ("Anxiety", "Tell us first.\nWe work around it"),
         ("Alignment", "Clear, removable,\nand nobody notices"),
         ("Hygiene", "Twice a year beats\nonce a crisis"),
         ("Children", "A first visit that\nis not a fight"),
         ("Emergency", "Same day, every day"),
         ("Crowns", "Milled here, fitted\nthe same visit"),
         ("Gums", "Treated before the\ntooth is lost"),
         ("Payment", "Split over the\ntreatment"),
         ("Aftercare", "A number that\nanswers")],
    ),
    Campaign(
        "dr-bichoy-magdi", "feed", "Dr. Bichoy Magdi", "Dental Clinic",
        "#1B2340", "#4C7DF0", "#EEF1FA", "Content series",
        [("Check-up", "Six months is not\na suggestion"),
         ("Sensitivity", "Cold should not\nhurt"),
         ("Veneers", "Matched to the face,\nnot to a catalogue"),
         ("Root canal", "The reputation is\nolder than the method"),
         ("Bleeding gums", "That is not normal.\nIt is common"),
         ("Night grinding", "Your jaw works\nwhile you sleep"),
         ("Brushing", "Two minutes. Count\nthem"),
         ("Booking", "Message, do not\nqueue"),
         ("Wisdom", "Out before it\ncauses trouble"),
         ("X-ray", "Digital, and a\nfraction of the dose"),
         ("Cleaning", "Fifteen minutes,\ntwice a year"),
         ("Whitening", "Shade matched to\nyour own enamel")],
    ),
    Campaign(
        "diet-care", "feed", "Diet Care", "Nutrition Clinics",
        "#1E2A17", "#7CB342", "#F1F5EA", "Nutrition campaign",
        [("Plans", "Food you already\neat, in order"),
         ("Metabolism", "It did not break.\nIt adapted"),
         ("Protein", "The one number most\npeople miss"),
         ("Follow-up", "Weekly, not when\nyou remember"),
         ("Children", "Growth charts, not\ncrash diets"),
         ("Sports", "Fuel the session,\nnot the guilt"),
         ("Diabetes", "A plate that still\ntastes like dinner"),
         ("Results", "Slow is the part\nthat lasts"),
         ("Ramadan", "A plan built around\nthe table"),
         ("Snacks", "Not banned.\nBudgeted"),
         ("Water", "Before you decide\nyou are hungry"),
         ("Plateau", "Expected. Planned\nfor")],
    ),
    Campaign(
        "dr-fady-fawzy", "deck", "Dr. Fady Fawzy", "Physiotherapy & Chiropractic",
        "#16232B", "#E0632F", "#F6EFEA", "Awareness campaign",
        [("Back pain", "The desk is the\ndiagnosis"),
         ("Posture", "You cannot sit up\nstraight for eight hours"),
         ("Manual therapy", "Hands first,\nmachines second"),
         ("Recovery", "A plan with an\nend date"),
         ("Sports injury", "Return to play,\nnot just to walking"),
         ("Neck", "The phone is at\nthe wrong height"),
         ("Sciatica", "The pain is in the\nleg. The cause is not"),
         ("Home work", "Ten minutes beats\none good session"),
         ("Knees", "Strength first,\nsurgery last"),
         ("Shoulder", "Frozen is a stage,\nnot a verdict"),
         ("Pregnancy", "Back pain is not\npart of the deal"),
         ("Elderly", "Balance is a skill\nyou can retrain")],
    ),
    Campaign(
        "pax-dental-house", "deck", "PAX", "Dental House",
        "#1A1A1A", "#B08D57", "#F4F1EC", "Brand campaign",
        [("Smile design", "Designed on screen\nbefore it is cut"),
         ("Materials", "Zirconia, and the\nreason why"),
         ("Hygiene", "Sterilisation you\ncan watch"),
         ("Consultation", "Thirty minutes before\nanything is decided"),
         ("Implants", "One surgeon, start\nto finish"),
         ("Comfort", "Sedation for the\npeople who need it"),
         ("Warranty", "Five years on every\ncrown"),
         ("House", "A clinic that feels\nlike neither"),
         ("Digital scan", "No tray, no\ngagging"),
         ("Veneers", "Reversible until\nthe day it is not"),
         ("Children", "A room that does\nnot look like one"),
         ("Plans", "Costed before\nanything starts")],
    ),
    Campaign(
        "neurology-clinic", "feed", "Neurology Clinic", "Kafr El-Sheikh",
        "#1D1B33", "#8E6CEF", "#F1EFFA", "Clinic campaign",
        [("Headache", "Not every headache\nis a migraine"),
         ("Epilepsy", "Controlled is the\ngoal, not cured"),
         ("Stroke", "Four hours decide\nthe next four years"),
         ("Memory", "Forgetting names is\nnot the warning sign"),
         ("Sleep", "Snoring is a\nneurological problem"),
         ("Numbness", "A hand that falls\nasleep too often"),
         ("Follow-up", "Medication is tuned,\nnot prescribed once"),
         ("Access", "A specialist without\nthe trip to Cairo"),
         ("Dizziness", "The ear and the\nbrain argue"),
         ("Tremor", "Early is the whole\ndifference"),
         ("Back", "Numbness is a\nnerve, not a muscle"),
         ("Reports", "Sent to your doctor\nthe same day")],
    ),
    Campaign(
        "one-stop-gresco", "scroll", "One Stop", "by Gresco",
        "#141414", "#D32027", "#EFEFEF", "Tyre campaign",
        [("Grip", "The road is wet\nfor nine seconds"),
         ("Pressure", "Two psi is a\nfull tank a month"),
         ("Alignment", "Your car pulls.\nYou correct. It wears"),
         ("Season", "Summer rubber in\nDecember is a bet"),
         ("Tread", "A coin tells you\nmore than a glance"),
         ("Fitting", "In and out in\nthirty minutes"),
         ("Balance", "The shake at 90\nis not the engine"),
         ("Warranty", "Five years, in\nwriting"),
         ("Rotation", "Every ten thousand,\nnot every mood"),
         ("Nitrogen", "Steadier pressure,\ncooler rubber"),
         ("Storage", "We keep your winter\nset for you"),
         ("Puncture", "Repaired if it can\nbe. Replaced if not")],
    ),
    Campaign(
        "global-auto-parts", "deck", "Global", "Auto Parts Store",
        "#16202B", "#F0A500", "#F3F1EC", "Parts campaign",
        [("Genuine", "The box matters as\nmuch as the part"),
         ("Stock", "Forty thousand lines,\non the shelf"),
         ("Delivery", "Ordered by noon,\nfitted by four"),
         ("Filters", "The cheapest service\nyou can skip"),
         ("Brakes", "Pads are not the\nplace to save"),
         ("Batteries", "Tested free, while\nyou wait"),
         ("Advice", "Tell us the car,\nnot the part number"),
         ("Warranty", "On the counter,\nin writing"),
         ("Oil", "The grade on the\ncap, not the shelf"),
         ("Belts", "Cheap to change,\nexpensive to ignore"),
         ("Lights", "Both sides, or\nneither"),
         ("Returns", "Fourteen days,\nno argument")],
    ),
    Campaign(
        "mohamed-fouda-law", "deck", "Mohamed Fouda", "Law & Legal Consultations",
        "#1B1B22", "#A98448", "#F3F1EC", "Practice campaign",
        [("Contracts", "Read before signing\nis the whole service"),
         ("Company law", "Set it up once,\nproperly"),
         ("Family", "Handled quietly"),
         ("Labour", "Your contract says\nmore than you think"),
         ("Property", "Check the title,\nnot the photographs"),
         ("Consultation", "An hour now saves\nthe case later"),
         ("Representation", "In court, and in\nthe room before it"),
         ("Fees", "Agreed in advance,\nin writing"),
         ("Inheritance", "Settled before it\ndivides a family"),
         ("Arbitration", "Faster than court,\nand binding"),
         ("Trademarks", "Register it before\nsomeone else does"),
         ("Debt", "Recovered, with\nthe paperwork")],
    ),
    Campaign(
        "nourish-cosmetics", "feed", "Nourish", "Cosmetics",
        "#2A1F2D", "#D98A8A", "#F7EFEA", "Product launch",
        [("Serum", "Skin does its\nrepair at night"),
         ("Ingredients", "Eleven. All of\nthem readable"),
         ("Routine", "Three steps, not\nthirteen"),
         ("SPF", "The cheapest\nanti-ageing there is"),
         ("Texture", "It sinks in before\nyou put the cap back"),
         ("Sensitive", "Tested on skin\nthat complains"),
         ("Refill", "The bottle stays.\nThe pouch goes"),
         ("Launch", "In store from\nThursday"),
         ("Cleanser", "The step people\nskip first"),
         ("Night", "Retinol, slowly"),
         ("Sets", "Priced as a routine,\nnot a shelf"),
         ("Returns", "Opened and used.\nStill returnable")],
    ),
    Campaign(
        "tbg-train-brain-to-gain", "feed", "TBG", "Train Brain To Gain",
        "#202243", "#FF6B35", "#F2F0EC", "Programme campaign",
        [("Focus", "Attention is trained,\nnot demanded"),
         ("Dyslexia", "The reading is slow.\nThe child is not"),
         ("Assessment", "Measured before\nanything is promised"),
         ("Sessions", "Twice a week, for\ntwelve weeks"),
         ("Parents", "You are in the room\nfor the first one"),
         ("Memory", "Working memory is\nthe bottleneck"),
         ("Confidence", "The marks follow\nthe confidence"),
         ("Progress", "Reported in numbers,\nnot adjectives"),
         ("ADHD", "Structure beats\nwillpower"),
         ("Reading", "Decoding, then\nspeed"),
         ("Maths", "Anxiety is the\nfirst thing we treat"),
         ("Teens", "Study skills that\nsurvive exams")],
    ),
]


# ------------------------------------------------------------------ elements

def logo(draw, x, y, size, colour):
    draw.ellipse([x, y, x + size, y + size], outline=colour, width=max(int(size * 0.12), 2))
    draw.ellipse([x + size * 0.34, y + size * 0.34, x + size * 0.66, y + size * 0.66], fill=colour)


def tracked(draw, xy, text, fnt, fill, track, centred=False):
    widths = [draw.textlength(c, font=fnt) + track for c in text]
    x = xy[0] - (sum(widths) - track) / 2 if centred else xy[0]
    for char, width in zip(text, widths):
        draw.text((x, xy[1]), char, font=fnt, fill=fill)
        x += width


def headline(draw, xy, text, fnt, fill, leading=1.18):
    x, y = xy
    for i, line in enumerate(text.split("\n")):
        draw.text((x, y + i * fnt.size * leading), line, font=fnt, fill=fill)


def post(size, campaign, index, kicker, text):
    """One square campaign post. Five layouts, rotated through the set."""
    style = index % 5
    w = h = size
    if style in (0, 3):
        bg, fg, sub, foot = campaign.deep, "#FFFFFF", campaign.accent, campaign.accent
    elif style == 1:
        # On the accent ground the kicker drops to the dark colour; white on
        # gold or on red does not hold.
        bg, fg, sub, foot = campaign.accent, "#FFFFFF", campaign.deep, campaign.deep
    elif style == 2:
        # The footer sits inside the accent bar at the foot of this one.
        bg, fg, sub, foot = campaign.tint, campaign.ink, campaign.accent, "#FFFFFF"
    else:
        bg, fg, sub, foot = campaign.tint, campaign.ink, campaign.accent, campaign.accent

    image = Image.new("RGB", (w, h), bg)
    draw = ImageDraw.Draw(image)
    m = w * 0.095

    if style == 0:
        draw.ellipse([w * 0.45, -h * 0.18, w * 1.25, h * 0.62], fill=campaign.accent)
    elif style == 2:
        draw.rectangle([0, h * 0.82, w, h], fill=campaign.accent)
    elif style == 3:
        draw.rectangle([0, 0, w, h * 0.38], fill=campaign.accent)
    elif style == 4:
        draw.pieslice([w * 0.62, h * 0.62, w * 1.5, h * 1.5], 0, 360, fill=campaign.accent)

    logo(draw, m, m, w * 0.075, fg)
    draw.text((m + w * 0.105, m + w * 0.012), campaign.brand, font=font(F_BOLD, w * 0.034), fill=fg)
    draw.text((m, h * 0.42), kicker.upper(), font=font(F_MONO, w * 0.028), fill=sub)
    headline(draw, (m, h * 0.49), text, font(F_DISP, w * 0.082), fg)
    draw.text((m, h - m * 0.9), campaign.line, font=font(F_REG, w * 0.026), fill=foot)
    return image


def portrait_post(w, h, campaign, kicker, text):
    image = Image.new("RGB", (w, h), campaign.deep)
    draw = ImageDraw.Draw(image)
    for y in range(h):
        draw.line([(0, y), (w, y)], fill=mix(campaign.deep, campaign.accent, (y / h) ** 2 * 0.65))
    m = w * 0.1
    logo(draw, m, m, w * 0.085, "#FFFFFF")
    draw.text((m + w * 0.12, m + w * 0.015), campaign.brand, font=font(F_BOLD, w * 0.038), fill="#FFFFFF")
    draw.text((m, h * 0.52), kicker.upper(), font=font(F_MONO, w * 0.03), fill="#FFFFFF")
    headline(draw, (m, h * 0.58), text, font(F_DISP, w * 0.088), "#FFFFFF")
    draw.text((m, h - m * 0.85), campaign.line, font=font(F_REG, w * 0.028), fill="#FFFFFF")
    return image


def strip(w, h, campaign, label):
    """A thin title band. The reference uses these as section markers."""
    image = Image.new("RGB", (w, h), campaign.accent)
    draw = ImageDraw.Draw(image)
    tracked(draw, (w / 2, h / 2 - h * 0.17), label.upper(), font(F_DISP, h * 0.3),
            "#FFFFFF", h * 0.09, centred=True)
    return image


def board(w, h, campaign, start, count, label=None):
    """A presentation board: `count` posts in a row on the brand ground."""
    image = Image.new("RGB", (w, h), campaign.deep)
    draw = ImageDraw.Draw(image)
    for y in range(h):
        draw.line([(0, y), (w, y)], fill=mix(campaign.deep, campaign.accent, (y / h) ** 2 * 0.3))

    m = min(w, h) * 0.085
    gap = w * 0.028
    top = m * (2.4 if label else 1.0)
    size = min((w - m * 2 - gap * (count - 1)) / count, h - top - m)
    left = (w - size * count - gap * (count - 1)) / 2

    if label:
        draw.text((m, m * 0.8), label.upper(), font=font(F_MONO, h * 0.05), fill=campaign.accent)

    for i in range(count):
        kicker, text = campaign.posts[(start + i) % len(campaign.posts)]
        thumb = post(540, campaign, start + i, kicker, text).resize(
            (int(size), int(size)), Image.LANCZOS)
        image.paste(thumb, (int(left + i * (size + gap)), int(top + (h - top - m - size) / 2)))
    return image


def solo(w, h, campaign, index):
    """One post beside the line it carries, set large."""
    kicker, text = campaign.posts[index % len(campaign.posts)]
    image = Image.new("RGB", (w, h), campaign.tint)
    draw = ImageDraw.Draw(image)
    m = min(w, h) * 0.1
    size = h - m * 2
    image.paste(post(540, campaign, index, kicker, text).resize((int(size), int(size)), Image.LANCZOS),
                (int(m), int(m)))
    x = m * 2 + size
    draw.text((x, h * 0.3), kicker.upper(), font=font(F_MONO, h * 0.045), fill=campaign.accent)
    headline(draw, (x, h * 0.39), text, font(F_DISP, h * 0.1), campaign.ink)
    return image


def crop(w, h, campaign, index):
    """
    A band lifted out of one post, so a post that comes round twice reads
    differently the second time. The post is widened to the board and the band
    is taken across the kicker and the headline, which keeps the words whole -
    zooming further turns the line into letters.
    """
    kicker, text = campaign.posts[index % len(campaign.posts)]
    source = post(1080, campaign, index, kicker, text)
    scale = w / source.width
    big = source.resize((w, int(source.height * scale)), Image.LANCZOS)
    top = min(max(big.height * 0.36, 0), big.height - h)
    return big.crop((0, int(top), w, int(top) + h))


def swatch(w, h, campaign):
    """The brand elements the campaign was built from."""
    image = Image.new("RGB", (w, h), campaign.tint)
    draw = ImageDraw.Draw(image)
    m = w * 0.085
    draw.text((m, m * 0.75), "THE KIT", font=font(F_MONO, w * 0.019), fill=campaign.accent)

    swatches = [("Deep", campaign.deep), ("Accent", campaign.accent), ("Tint", campaign.tint)]
    gap = w * 0.02
    cell = (w - m * 2 - gap * 2) / 3
    top = h * 0.17
    swatch_h = min(cell * 0.72, h * 0.3)
    for i, (name, value) in enumerate(swatches):
        x = m + i * (cell + gap)
        draw.rectangle([x, top, x + cell, top + swatch_h], fill=value,
                       outline=campaign.accent, width=1)
        draw.text((x, top + swatch_h + h * 0.03), name, font=font(F_BOLD, w * 0.019),
                  fill=campaign.ink)
        draw.text((x, top + swatch_h + h * 0.065), value.upper(), font=font(F_MONO, w * 0.016),
                  fill=campaign.accent)

    base = top + swatch_h + h * 0.14
    draw.text((m, base), "Aa", font=font(F_DISP, w * 0.12), fill=campaign.accent)
    rows = (("Headline", F_DISP, 0.034), ("Kicker", F_MONO, 0.021), ("Body", F_REG, 0.019))
    step = (h * 0.92 - base) / len(rows)
    for i, (label, path, size) in enumerate(rows):
        y = base + i * step
        draw.text((m + w * 0.22, y), "The quick brown fox", font=font(path, w * size),
                  fill=campaign.ink)
        draw.text((m + w * 0.22, y + step * 0.46), label, font=font(F_MONO, w * 0.014),
                  fill=campaign.accent)

    logo(draw, w - m - w * 0.07, base, w * 0.07, campaign.accent)
    return image


def key_visual(w, h, campaign):
    """The opening board: the wordmark over a 2x2 of posts from the set."""
    image = Image.new("RGB", (w, h), campaign.deep)
    draw = ImageDraw.Draw(image)
    for y in range(h):
        draw.line([(0, y), (w, y)], fill=mix(campaign.deep, campaign.accent, (y / h) ** 1.8 * 0.5))

    logo(draw, w / 2 - w * 0.035, h * 0.075, w * 0.07, "#FFFFFF")
    tracked(draw, (w / 2, h * 0.2), campaign.brand.upper(), font(F_DISP, w * 0.072),
            "#FFFFFF", w * 0.009, centred=True)
    draw.text((w / 2, h * 0.3), campaign.line + "   ·   Social Media Management",
              font=font(F_REG, w * 0.019), fill="#FFFFFF", anchor="ma")

    cell = w * 0.21
    gap = w * 0.022
    left = (w - cell * 2 - gap) / 2
    top = h * 0.4
    for i in range(4):
        kicker, text = campaign.posts[i]
        thumb = post(540, campaign, i, kicker, text).resize((int(cell), int(cell)), Image.LANCZOS)
        image.paste(thumb, (int(left + (i % 2) * (cell + gap)), int(top + (i // 2) * (cell + gap))))
    return image


def tall_board(w, h, campaign):
    """The centrepiece of the scroll model: one portrait cut, shown large."""
    image = Image.new("RGB", (w, h), campaign.tint)
    draw = ImageDraw.Draw(image)
    m = w * 0.09
    draw.text((m, m * 0.7), "THE STORY CUT", font=font(F_MONO, w * 0.019), fill=campaign.accent)
    inner_w = w - m * 2
    inner_h = inner_w / 0.8
    if inner_h > h - m * 2.6:
        inner_h = h - m * 2.6
        inner_w = inner_h * 0.8
    kicker, text = campaign.posts[-1]
    cut = portrait_post(1080, 1350, campaign, kicker, text).resize(
        (int(inner_w), int(inner_h)), Image.LANCZOS)
    image.paste(cut, (int((w - inner_w) / 2), int(m * 1.8)))
    return image


def phones(w, h, campaign):
    """Three phones showing the posts in the feed they were made for."""
    image = Image.new("RGB", (w, h), campaign.tint)
    draw = ImageDraw.Draw(image)
    draw.text((w * 0.5, h * 0.08), "In the feed", font=font(F_DISP, w * 0.034),
              fill=campaign.ink, anchor="ma")

    phone_w = min(w * 0.17, (h * 0.72) / 2.03)
    phone_h = phone_w * 2.03
    gap = w * 0.045
    left = (w - phone_w * 3 - gap * 2) / 2
    top = h * 0.2
    for i in range(3):
        x = left + i * (phone_w + gap)
        draw.rounded_rectangle([x, top, x + phone_w, top + phone_h],
                               radius=phone_w * 0.1, fill=campaign.deep)
        draw.rounded_rectangle([x + phone_w * 0.36, top + phone_w * 0.045,
                                x + phone_w * 0.64, top + phone_w * 0.085],
                               radius=phone_w * 0.02, fill="#FFFFFF")
        inner = phone_w * 0.92
        ix, iy = x + (phone_w - inner) / 2, top + phone_w * 0.14
        kicker, text = campaign.posts[(i + 4) % len(campaign.posts)]
        thumb = post(540, campaign, i + 1, kicker, text).resize((int(inner), int(inner)), Image.LANCZOS)
        image.paste(thumb, (int(ix), int(iy)))
        bar = iy + inner
        draw.rectangle([ix, bar, ix + inner, bar + phone_w * 0.07], fill="#FFFFFF")
        draw.rectangle([ix + inner * 0.06, bar + phone_w * 0.09,
                        ix + inner * 0.7, bar + phone_w * 0.115], fill="#FFFFFF")
    return image


def banner(w, h, campaign):
    """The 3:1 cover the feed model opens with."""
    image = Image.new("RGB", (w, h), campaign.deep)
    draw = ImageDraw.Draw(image)
    for x in range(w):
        draw.line([(x, 0), (x, h)], fill=mix(campaign.deep, campaign.accent, (x / w) ** 1.5 * 0.7))
    m = w * 0.055
    logo(draw, m, h * 0.3, h * 0.17, "#FFFFFF")
    tracked(draw, (m, h * 0.3), campaign.brand.upper(), font(F_DISP, h * 0.17), "#FFFFFF", h * 0.02)
    draw.text((m, h * 0.62), campaign.line + "   ·   Social Media Management",
              font=font(F_REG, h * 0.055), fill="#FFFFFF")
    size = h * 0.56
    for i in range(3):
        kicker, text = campaign.posts[i]
        thumb = post(540, campaign, i, kicker, text).resize((int(size), int(size)), Image.LANCZOS)
        image.paste(thumb, (int(w - m - size * 3 - h * 0.08 * 2 + i * (size + h * 0.08)),
                            int((h - size) / 2)))
    return image


# ----------------------------------------------------------------- the models
# (name, kind, width, height, argument)

#   El Fouad's shape: two near-square key visuals, two title strips, nine
#   boards in a tight 517-572 band, a wider closing board. The framings are
#   mixed so a post that comes round twice is never shown the same way.
DECK = [
    ("01-key-visual", "key", 1400, 1375, None),
    ("02-title", "strip", 1400, 212, "campaign"),
    ("03-subtitle", "strip", 1400, 212, "line"),
    ("04-the-kit", "swatch", 1400, 1412, None),
    ("05-board", "pair", 1400, 572, None),
    ("06-board", "solo", 1400, 562, None),
    ("07-board", "pair", 1400, 517, None),
    ("08-board", "crop", 1400, 562, None),
    ("09-board", "pair", 1400, 562, None),
    ("10-board", "solo", 1400, 517, None),
    ("11-board", "pair", 1400, 568, None),
    ("12-board", "crop", 1400, 569, None),
    ("13-board", "pair", 1400, 549, None),
    ("14-closing", "trio", 1400, 1020, None),
]

#   Dolmabahce's shape: twenty-one pieces, almost no two the same height, five
#   thin strips as breathers, the story cut as the centrepiece, and a run of
#   four same-height boards before the close.
SCROLL = [
    ("01-key-visual", "key", 1400, 1375, None),
    ("02-title", "strip", 1400, 341, "campaign"),
    ("03-subtitle", "strip", 1400, 216, "line"),
    ("04-board", "pair", 1400, 871, None),
    ("05-board", "solo", 1400, 839, None),
    ("06-board", "pair", 1400, 837, None),
    ("07-board", "crop", 1400, 842, None),
    ("08-board", "pair", 1400, 915, None),
    ("09-break", "strip", 1400, 257, "campaign"),
    ("10-story-cut", "tall", 1400, 1770, None),
    ("11-board", "pair", 1400, 865, None),
    ("12-break", "strip", 1400, 246, "line"),
    ("13-board", "solo", 1400, 550, None),
    ("14-break", "strip", 1400, 239, "campaign"),
    ("15-the-kit", "swatch", 1400, 825, None),
    ("16-in-the-feed", "phones", 1400, 788, None),
    ("17-board", "pair", 1400, 787, None),
    ("18-board", "crop", 1400, 787, None),
    ("19-board", "pair", 1400, 786, None),
    ("20-board", "solo", 1400, 821, None),
    ("21-closing", "trio", 1400, 1014, None),
]

FEED = (
    [("01-banner", "banner", 1920, 640, None)]
    + [("%02d-post" % (i + 2), "post", 1080, 1080, None) for i in range(10)]
    + [("12-post", "post", 714, 714, None),
       ("13-story", "portrait", 1080, 1350, None)]
)

MODELS = {"deck": DECK, "scroll": SCROLL, "feed": FEED}

NOTES = {
    "key": "the opening key visual, the wordmark over four posts from the set",
    "strip": "a title band carrying the campaign name",
    "tall": "the story cut, shown large as the centrepiece",
    "phones": "three phones showing the posts in the feed",
    "banner": "the campaign banner",
    "trio": "a closing board, three posts in a row",
}


def build():
    manifest = {}
    for campaign in CAMPAIGNS:
        folder = os.path.join(OUT_ROOT, campaign.slug)
        os.makedirs(folder, exist_ok=True)
        for stale in os.listdir(folder):
            os.remove(os.path.join(folder, stale))

        entries = []
        index = 0
        for name, kind, w, h, arg in MODELS[campaign.model]:
            note = NOTES.get(kind)
            if kind == "key":
                image = key_visual(w, h, campaign)
            elif kind == "strip":
                image = strip(w, h, campaign,
                              campaign.kicker if arg == "campaign" else campaign.line)
                note = "a title band reading %s" % (
                    campaign.kicker if arg == "campaign" else campaign.line)
            elif kind == "tall":
                image = tall_board(w, h, campaign)
            elif kind == "phones":
                image = phones(w, h, campaign)
            elif kind == "banner":
                image = banner(w, h, campaign)
            elif kind == "portrait":
                kicker, text = campaign.posts[-1]
                image = portrait_post(w, h, campaign, kicker, text)
                note = "the story cut, %s" % text.replace("\n", " ").lower()
            elif kind == "swatch":
                image = swatch(w, h, campaign)
                note = "the colours and type the campaign was built from"
            elif kind == "solo":
                image = solo(w, h, campaign, index)
                note = "the %s post shown large beside its line" % (
                    campaign.posts[index % len(campaign.posts)][0].lower())
                index += 1
            elif kind == "crop":
                image = crop(w, h, campaign, index)
                note = "a detail lifted out of the %s post" % (
                    campaign.posts[index % len(campaign.posts)][0].lower())
                index += 1
            elif kind in ("pair", "trio"):
                count = 2 if kind == "pair" else 3
                image = board(w, h, campaign, index, count)
                note = "a board carrying the %s and %s posts" % (
                    campaign.posts[index % len(campaign.posts)][0].lower(),
                    campaign.posts[(index + 1) % len(campaign.posts)][0].lower())
                index += count
            else:
                kicker, text = campaign.posts[index % len(campaign.posts)]
                image = post(w, campaign, index, kicker, text)
                note = "the %s post, %s" % (kicker.lower(), text.replace("\n", " ").lower())
                index += 1

            filename = name + ".webp"
            image.save(os.path.join(folder, filename), "WEBP", quality=86, method=6)
            entries.append({
                "src": "/work/%s/%s" % (campaign.slug, filename),
                "alt": "%s campaign, %s" % (campaign.brand, note),
                "width": w, "height": h,
            })

        manifest[campaign.slug] = {"model": campaign.model, "cover": entries[0],
                                   "gallery": entries[1:]}
        size = sum(os.path.getsize(os.path.join(folder, f)) for f in os.listdir(folder))
        print("%-28s %-7s %2d files %6.0f KB" % (campaign.slug, campaign.model,
                                                 len(entries), size / 1024))

    json.dump(manifest, open(MANIFEST, "w"), indent=1)
    print("manifest ->", MANIFEST)


if __name__ == "__main__":
    build()

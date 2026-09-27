#!/usr/bin/env python3
"""Export the app's screen previews as the phone screenshots this site shows.

The screenshots are the app's own Roborazzi preview references, rendered at a phone's size and
density rather than the 1× the app repository keeps them at. See README.md, "Regenerating the
screenshots", for the one-line change that renders them that way. Then:

    python3 scripts/export-screens.py ../../open-gym

Every image is written to static/img/screens/<name>.webp at 720 × 1560 (a 393 × 852 dp phone
at 1.83×): taller previews are cropped from the top, shorter ones padded with their own
background colour.
"""

import pathlib
import sys

from PIL import Image, ImageDraw

SITE = pathlib.Path(__file__).resolve().parent.parent
OUT = SITE / "static/img/screens"
WIDTH = 720
HEIGHT = round(WIDTH * 852 / 393)

# Previews whose screen draws no background of its own, so the preview's white shows through
# around and between the cards. In the app the screen sits on the theme's paper colour; the
# white connected to the image's edge is flood-filled with it (PaperLight / PaperDark in
# core/ui/.../theme/Color.kt).
BACKGROUND = {
    "stats": (0xFA, 0xFA, 0xF7),
    "stats-dark": (0x10, 0x10, 0x14),
}

# Site name → the end of the preview's reference file name (`…Kt.<Function>.<Preview name>.png`).
SCREENS = {
    "home": "HomeScreenPreview.Home_H720dp_WITH_BACKGROUND",
    "session-active": "ActiveSessionScreenPreview.Active_session_H1800dp_WITH_BACKGROUND",
    "session-active-dark": "ActiveSessionScreenDarkPreview.Active_session,_dark_WITH_BACKGROUND",
    "session-resting": "ActiveSessionScreenRestingPreview.Active_session_-_resting_WITH_BACKGROUND",
    "session-warmup": "ActiveSessionScreenSuggestionsPreview.Active_session_-_with_suggestions_H2400dp_WITH_BACKGROUND",
    "session-summary": "SessionSummaryScreenPreview.Session_summary_H900dp_WITH_BACKGROUND",
    "session-levelup": "SessionSummaryScreenLevelUpPreview.Session_summary_-_level_up_H900dp_WITH_BACKGROUND",
    "stats": "StatsScreenPreview.Stats_W360dp_H1200dp_WITH_BACKGROUND",
    "stats-dark": "StatsScreenDarkPreview.Stats_-_dark_W360dp_H1200dp_WITH_BACKGROUND",
    "records": "PersonalRecordsScreenPreview.Personal_records_H700dp_WITH_BACKGROUND",
    "progression": "ExerciseProgressionScreenPreview.Exercise_progression_W360dp_H1100dp_WITH_BACKGROUND",
    "body": "BodyMeasurementsScreenPreview.Body_measurements_W360dp_H1100dp_WITH_BACKGROUND",
    "calendar": "SessionsScreenCalendarPreview.Sessions_-_calendar_H720dp_WITH_BACKGROUND",
    "templates": "SessionsScreenTemplatesPreview.Sessions_-_templates_H720dp_WITH_BACKGROUND",
    "template-editor": "TemplateEditorScreenPreview.Template_editor_H2400dp_WITH_BACKGROUND",
    "library": "ExerciseLibraryScreenPreview.Exercise_library_WITH_BACKGROUND",
    "exercise-detail": "ExerciseDetailScreenPreview.Exercise_detail_H1600dp_WITH_BACKGROUND",
    "plate-calculator": "PlateCalculatorScreenPreview.Plate_calculator_H1000dp_WITH_BACKGROUND",
    "quests": "QuestLogScreenPreview.Quest_log_H1400dp_WITH_BACKGROUND",
    "achievements": "AchievementsScreenPreview.Achievements_H760dp_WITH_BACKGROUND",
    "backup": "BackupScreenPreview.Backup_-_idle_H1000dp_WITH_BACKGROUND",
    "reminder": "ReminderScreenPreview.Reminder_H900dp_WITH_BACKGROUND",
    "settings": "SettingsScreenPreview.Settings_H1500dp_WITH_BACKGROUND",
    "onboarding-welcome": "OnboardingWelcomePreview.Onboarding_-_welcome_H780dp_WITH_BACKGROUND",
    "onboarding-goal": "OnboardingGoalPreview.Onboarding_-_training_goal_H780dp_WITH_BACKGROUND",
}


def main(app_repo: pathlib.Path) -> None:
    references = list(app_repo.glob("feature/*/src/test/screenshots/*.png"))
    OUT.mkdir(parents=True, exist_ok=True)
    for name, suffix in SCREENS.items():
        matches = [p for p in references if p.name.endswith(f".{suffix}.png")]
        if len(matches) != 1:
            sys.exit(f"{name}: expected one reference ending in {suffix}.png, found {len(matches)}")
        image = Image.open(matches[0]).convert("RGB")
        if name in BACKGROUND:
            # thresh also takes in the anti-aliased fringe where the white meets a card.
            ImageDraw.floodfill(image, (0, 0), BACKGROUND[name], thresh=60)
        image = image.resize((WIDTH, round(image.height * WIDTH / image.width)), Image.LANCZOS)
        if image.height > HEIGHT:
            image = image.crop((0, 0, WIDTH, HEIGHT))
        elif image.height < HEIGHT:
            padded = Image.new("RGB", (WIDTH, HEIGHT), image.getpixel((2, image.height - 2)))
            padded.paste(image, (0, 0))
            image = padded
        image.save(OUT / f"{name}.webp", "WEBP", quality=84, method=6)
        print(f"wrote static/img/screens/{name}.webp")

    stale = {p.stem for p in OUT.glob("*.webp")} - SCREENS.keys()
    for name in sorted(stale):
        print(f"not in SCREENS, delete if unused: static/img/screens/{name}.webp")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(pathlib.Path(sys.argv[1]))

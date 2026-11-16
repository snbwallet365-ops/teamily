import Foundation

extension Store {
    static func seed() -> Vault {
        let now = Date()

        let agents: [Agent] = [
            Agent(id: "a1", name: "Saudi & Gulf Visa Specialist", icon: "moon.stars.fill", role: "Gulf visa specialist",
                  summary: "Saudi, UAE, Qatar and Oman visit, Umrah and work visa files.",
                  skills: ["Visit visa", "Umrah", "Work permit"], tint: 0, pinned: true),
            Agent(id: "a2", name: "Schengen Visa Specialist", icon: "globe.europe.africa.fill", role: "Schengen advisor",
                  summary: "Short stay Schengen files, insurance, itinerary and consulate choice.",
                  skills: ["Schengen", "Insurance", "Itinerary"], tint: 1, pinned: true),
            Agent(id: "a3", name: "UK & Ireland Advisor", icon: "crown.fill", role: "UK visa advisor",
                  summary: "Standard visitor, student and spouse routes with document proof.",
                  skills: ["Visitor", "Student", "Spouse"], tint: 2, pinned: false),
            Agent(id: "a4", name: "Canada & US Advisor", icon: "shield.lefthalf.filled", role: "North America advisor",
                  summary: "Visitor visas, DS-160 support, invitation letters and interview prep.",
                  skills: ["DS-160", "Invitation", "Interview"], tint: 3, pinned: false),
            Agent(id: "a5", name: "Australia & NZ Advisor", icon: "airplane", role: "Oceania advisor",
                  summary: "Subclass 600 files, funds evidence, health insurance and timelines.",
                  skills: ["Subclass 600", "Funds", "Insurance"], tint: 4, pinned: false),
            Agent(id: "a6", name: "Document Checklist Agent", icon: "checklist", role: "Checklist builder",
                  summary: "Builds the exact document list per country and purpose.",
                  skills: ["Checklists", "Verification"], tint: 5, pinned: true),
            Agent(id: "a7", name: "Cover Letter Writer", icon: "square.and.pencil", role: "Letter specialist",
                  summary: "One page cover letters for family, business and tourist files.",
                  skills: ["Cover letter", "Affidavit"], tint: 0, pinned: false),
            Agent(id: "a8", name: "Appointment & Biometrics Agent", icon: "calendar", role: "Slot tracker",
                  summary: "Embassy slots, biometrics centres and deadline tracking.",
                  skills: ["Slots", "VFS", "Deadlines"], tint: 1, pinned: false),
            Agent(id: "a9", name: "Interview Coach", icon: "mic.fill", role: "Mock interview coach",
                  summary: "Runs mock interviews and scores the ten most common questions.",
                  skills: ["Mock", "Scoring", "Confidence"], tint: 2, pinned: false),
            Agent(id: "a10", name: "Compliance Reviewer", icon: "checkmark.shield.fill", role: "File reviewer",
                  summary: "Checks a finished file for missing pages, mismatch and refusal risks.",
                  skills: ["Audit", "Risk", "Refusal"], tint: 3, pinned: false)
        ]

        let chats: [Chat] = [
            Chat(id: "c1", agentID: "a1", unread: 2, updatedAt: now.addingTimeInterval(-180), messages: [
                Message(mine: false, text: "Saudi visit visa file for Mr Rahman is 80 percent ready. Only the bank statement is older than three months.", at: now.addingTimeInterval(-900)),
                Message(mine: true, text: "What do we need to replace it?", at: now.addingTimeInterval(-600)),
                Message(mine: false, text: "A statement dated within 30 days, stamped by the bank, showing the last six months. I can also add a sponsor letter if the balance is low.", at: now.addingTimeInterval(-180))
            ]),
            Chat(id: "c2", agentID: "a6", unread: 1, updatedAt: now.addingTimeInterval(-2600), messages: [
                Message(mine: false, text: "Schengen checklist is built for a family of four: 34 items across identity, funds, travel and purpose. Two items are missing per applicant.", at: now.addingTimeInterval(-2600))
            ]),
            Chat(id: "c3", agentID: "a7", unread: 0, updatedAt: now.addingTimeInterval(-9000), messages: [
                Message(mine: true, text: "Draft the UK cover letter for a two week family visit.", at: now.addingTimeInterval(-9600)),
                Message(mine: false, text: "Draft is in Artifacts. It states purpose, dates, host details, funding and return intent in one page, ready to print.", at: now.addingTimeInterval(-9000))
            ])
        ]

        let teams: [Team] = [
            Team(id: "t1", name: "Saudi Umrah Case Team", icon: "moon.stars.fill",
                 summary: "Saudi specialist, checklist and appointment tracking for Umrah files.",
                 memberIDs: ["a1", "a6", "a8"]),
            Team(id: "t2", name: "Schengen Family Trip", icon: "globe.europe.africa.fill",
                 summary: "Four applicants, one itinerary, one insurance policy.",
                 memberIDs: ["a2", "a6", "a9"]),
            Team(id: "t3", name: "Client Onboarding", icon: "person.2.fill",
                 summary: "First contact to signed file, letters and compliance included.",
                 memberIDs: ["a1", "a7", "a10"])
        ]

        let automations: [Automation] = [
            Automation(id: "u1", name: "Morning visa digest", schedule: "Every day at 9:00",
                       prompt: "Summarise new messages, deadlines and missing documents.",
                       agentID: "a6", isOn: true, lastRun: nil),
            Automation(id: "u2", name: "Appointment slot watch", schedule: "Every 2 hours",
                       prompt: "Check tracked embassies for newly opened slots.",
                       agentID: "a8", isOn: true, lastRun: nil),
            Automation(id: "u3", name: "Weekly file audit", schedule: "Every Monday at 8:00",
                       prompt: "Review every open file for missing pages and refusal risk.",
                       agentID: "a10", isOn: false, lastRun: nil)
        ]

        let memories: [MemoryItem] = [
            MemoryItem(id: "m1", key: "Applicant", value: "Md Rahman, passport BD1234567, expires 2029"),
            MemoryItem(id: "m2", key: "Destination", value: "Saudi Arabia, Umrah, 14 days in December"),
            MemoryItem(id: "m3", key: "Sponsor", value: "Brother in law, Jeddah, host letter on file"),
            MemoryItem(id: "m4", key: "House rule", value: "Bank statements must be under 30 days old")
        ]

        let artifacts: [ArtifactItem] = [
            ArtifactItem(id: "r1", icon: "checklist", title: "Saudi visit visa checklist",
                         body: "Passport valid 6+ months, two blank pages\nWhite background photos 35x45mm\nConfirmed return ticket\nHotel or host booking\nBank statement under 30 days\nNID copy\nCover letter",
                         at: now.addingTimeInterval(-86400)),
            ArtifactItem(id: "r2", icon: "square.and.pencil", title: "UK visitor cover letter",
                         body: "To the Entry Clearance Officer,\n\nI am travelling to the United Kingdom from 4 to 18 January to visit my sister. I will stay at her address in Manchester, and she will provide accommodation. I fund the trip myself from savings of GBP 6,400 held at my bank, statement attached. I run a trading business in Dhaka and will return to my family on 19 January.\n\nYours faithfully,\nMd Rahman",
                         at: now.addingTimeInterval(-172800)),
            ArtifactItem(id: "r3", icon: "checkmark.shield.fill", title: "Schengen file audit",
                         body: "Files checked 4\nComplete 2\nMissing insurance 1\nStatement too old 1\nRecommendation: refresh statements before booking biometrics.",
                         at: now.addingTimeInterval(-259200))
        ]

        return Vault(agents: agents, chats: chats, teams: teams, automations: automations,
                     memories: memories, artifacts: artifacts,
                     darkMode: false, apiKey: "", model: "grok-4")
    }
}

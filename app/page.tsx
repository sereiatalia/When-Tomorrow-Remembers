Warning: truncated output (original token count: 11164)
Total output lines: 1334

"use client";

import {
  useMemo,
  useRef,
  useState,
  type PointerEvent,
  type UIEvent,
} from "react";
import { useEffect } from "react";
import { supabase } from "./supabase";
import { storySections } from "./storyContent";

export const dynamic = "force-static";

type Mode = "present" | "past";

const chapters = [
  ["Prologue", "The First Rule", "1998 · Quezon City", "Tomas Reyes"],
  ["01", "December 25, 2017", "2017 · Manila Airport", "Aurelia · Adrian"],
  ["02", "The Boy at the Airport", "2017 · Manila Airport", "Adrian"],
  ["03", "A Customer Who Wanted Yesterday", "—", "Aurelia"],
  ["04", "Adrian’s Code", "—", "Aurelia · Adrian"],
  ["05", "The Woman Who Wanted to Be Forgotten", "—", "A customer"],
  ["06", "The Game Developer", "2027 · Makati", "Aurelia"],
  ["07", "The Object That Returned Wrong", "—", "Aurelia"],
  ["08", "Christmas in Makati", "—", "Aurelia · Adrian"],
  ["09", "The Wrong Goodbye", "—", "Aurelia"],
  ["10", "The Modern Machine", "2027 · Laboratory", "Grandma"],
  ["11", "The Analyst", "—", "Adrian"],
  ["12", "The Child Who Remembered Tomorrow", "—", "Aurelia"],
  ["13", "The AV Necklace", "—", "Aurelia · Adrian"],
  ["14", "The Rule About Two", "—", "Aurelia"],
  ["15", "The Person Who Should Not Be There", "—", "Aurelia"],
  ["16", "The Cost of Staying", "—", "Aurelia · Grandma"],
  ["17", "A Visit Without a Customer", "2017 · Makati", "Aurelia · Adrian"],
  ["18", "The Return Point", "—", "Aurelia · Grandma"],
  ["19", "The Woman in the Photograph", "—", "Aurelia"],
  ["20", "When Tomorrow Remembers", "2030 · Manila", "Aurelia · Adrian"],
];

const yearProfiles: Record<
  string,
  {
    location: string;
    date: string;
    mode: Mode;
    interface: string;
    signal: string;
  }
> = {
  "1998": {
    location: "QUEZON CITY",
    date: "JUN 14",
    mode: "past",
    interface: "LEGACY TERMINAL",
    signal: "RETURN SIGNAL ............... WAITING",
  },
  "2017": {
    locatio…10164 tokens truncated…div className="password-field">
                  <input
                    className="auth-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    disabled={!supabaseReady}
                  />
                  <button
                    className="password-toggle"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    disabled={!supabaseReady}
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
                <button
                  className="button primary auth-submit"
                  onClick={submitAuth}
                  disabled={!supabaseReady}
                >
                  {authMode === "signup" ? "Create account" : "Sign in"}{" "}
                  <span>↗</span>
                </button>
                {authMessage && <p className="auth-message">{authMessage}</p>}
                <small className="auth-note">
                  {authMode === "signup"
                    ? "A confirmation email will be sent before your first sign-in."
                    : "Use the email and password from your archive account."}
                </small>
              </>
            )}
          </div>
        </div>
      )}
      <footer className="footer shell">
        <div className="footer-mark">◌</div>
        <div>
          <p>WHEN TOMORROW REMEMBERS</p>
          <span>
            Book 1 is still being recorded.
            <br />
            Some files may remember more than they should.
          </span>
        </div>
        <a href="#top">RETURN TO TOP ↑</a>
      </footer>
    </main>
  );
}

